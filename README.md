# discord-emoji

Simple discord emoji library derived from the great work by [xCykrix and Necktrox](https://github.com/xCykrix/discord_emoji/).

A near exact emoji tables of Discord for string-based insertion of emotes without having to escape Unicode. No skin accents or categories.

## Install / Usage

```ts
// Node.js
// $ pnpm add github:asger-finding/discord_emoji
const dismoji = require("discord-emoji");

// Examples of Assertions. dismoji.identifier
assertEquals(dismoji.grinning, "😀");
assertEquals(dismoji.dog, "🐶");
assertEquals(dismoji.hamburger, "🍔");
assertEquals(dismoji.basketball, "🏀");
assertEquals(dismoji.airplane, "✈️");
assertEquals(dismoj.watch, "⌚");
assertEquals(dismoji.eight_pointed_black_star, "✴️");
assertEquals(dismoji.flag_us, "🇺🇸");
```

## Acknowledgements

- xCykrix: Author (Samuel Voeller)
- Necktrox: Previous Author (Marek Kulik)
