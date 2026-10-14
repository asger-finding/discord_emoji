# discord_emoji

Discord's emoji table as a plain object, so you can insert emojis by name without escaping Unicode. Derived from the work by [xCykrix and Necktrox](https://github.com/xCykrix/discord_emoji/).

Each emoji appears once under its primary Discord name. Skin tone variants, aliases and categories are left out.

## Installation

```sh
npm install @asger-finding/discord_emoji
```

## Usage

```js
import emoji from '@asger-finding/discord_emoji';
// or: const emoji = require('@asger-finding/discord_emoji');

emoji.grinning;                 // '😀'
emoji.dog;                      // '🐶'
emoji.airplane;                 // '✈️'
emoji.eight_pointed_black_star; // '✴️'
emoji.flag_us;                  // '🇺🇸'
```

The typings list every name with its emoji, so editors autocomplete names and TypeScript rejects unknown ones.

## Development

Development needs Node.js 22.18 or later.

| Command          | Description                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| `npm run scrape` | Downloads Discord's web client and regenerates `index.js`, `index.cjs` and their typings |
| `npm test`       | Type checks and runs the tests                                                |
| `npm run lint`   | Lints with the strict typescript-eslint rules                                 |

## Acknowledgements

- xCykrix (Samuel Voeller): author
- Necktrox (Marek Kulik): previous author
