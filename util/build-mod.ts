import { cheerio } from 'https://deno.land/x/cheerio@1.0.7/mod.ts';

interface EmojiIndex {
  [key: string]: Emoji[];
}
interface Emoji {
  names: string[];
  surrogates: string;
  unicodeVersion: number;
  hasDiversityParent?: boolean;
  diversityChildren?: Emoji;
}

async function assets(): Promise<string[]> {
  console.info('Downloading UI...');

  // Build Request State
  const result = await fetch(
    'https://discord.com/channels/@me/1',
  );
  const html = await result.text();
  const $ = cheerio.load(html);

  // Pull all script assets from discord.com
  const urls: string[] = [];

  // Parse Script Tags
  const scripts = $('script');
  console.info('Building the list of indexed assets...');
  scripts.each((_index: number, element: unknown) => {
    urls.push($(element).attr('src')!);
  });

  // Parse Link Tags
  const links = $('link');
  links.each((_index: number, element: unknown) => {
    urls.push($(element).attr('href')!);
  });

  // Return Filtered & Log Count
  const filtered = urls.filter((v) => v !== undefined && v.endsWith('.js'));
  console.info(
    `Finished building the indexed asset list. Found: ${filtered.length}.`,
  );
  return filtered;
}

// Process Indexed Assets
console.info('Processing the list of indexed assets.');
let result: EmojiIndex = {};
for (const asset of await assets()) {
  // Download and convert the asset to text in memory individually.
  // deno-lint-ignore no-await-in-loop
  const source = await fetch(`https://discord.com${asset}`);
  // deno-lint-ignore no-await-in-loop
  let js = await source.text();

  // Skip the assets which do not include the expected snippet.
  if (!js.includes(`e.exports=JSON.parse('{"people":[`)) {
    console.info(`Skipped: ${asset}`);
    continue;
  }

  // Asset found. Extract emoji index.
  console.info(`Found emoji-index within: ${asset}`);
  js =
    js.toString().match(
      /(e\.exports=JSON.parse\('{"people":.*"unicodeVersion":6}]}'\))/gm,
    )![0];
  // Extract to file and build with eval.
  const src = `
    class EIndex {
      webpackChunkdiscord_app = []
      e = { exports: {} }

      constructor() {
        _REPLACE_ME_WITH_JS_SRC
      }

      extract() {
        this.webpackChunkdiscord_app[0][1]['838426'](this.e)
      }

      recall() {
        return this.e;
      }
    }
    new EIndex();
  `.replace('_REPLACE_ME_WITH_JS_SRC', js).replace(
    'e.exports',
    'this.e.exports',
  );

  const extract = eval(src);
  result = extract.e.exports as EmojiIndex;
  console.log(result);
  console.info('Extracted the emoji-index.');
  break;
}

// Define the outer scope needed to process the emoji-index.
const output: string[] = [
  // NOTE: This is the output file. Not this build file directly. Changes to THIS file are potentially accepted.
  '// deno-lint-ignore-file prefer-ascii',
  '// This file is generated automatically with "deno task build" and should not be modified manually.',
  '// Please do not commit changes to this file. They will be rejected regardless of proposed changes.',
  '//',
  `// GENERATED: ${new Date()}`,
  '',
];

const flattened = [ ...Object.values(result) ].flat();

output.push('export default {');

for (const i of Object.values(flattened)) {
  const emoji: Emoji = i;
  const [identifier] = emoji.names;
  const symbol = emoji.surrogates;

  const skintones = [
      0x0001F3FB,
      0x0001F3FC,
      0x0001F3FD,
      0x0001F3FE,
      0x0001F3FF
  ];
  const skinAccents = [...symbol].map(joint => {
    const unicode = joint.codePointAt(0);
    return typeof unicode === 'number' ?  skintones.includes(unicode) : false;
  });
  if (skinAccents.includes(true)) continue;

  output.push(`  "${identifier}": "${symbol}",`);
}

output.push('}', '');

// Write to the output.
await Deno.writeFile(
  './mod.js',
  new TextEncoder().encode(output.join('\n')),
);
