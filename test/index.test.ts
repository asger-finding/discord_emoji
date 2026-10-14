import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import emoji from '@asger-finding/discord_emoji';

const require = createRequire(import.meta.url);

test('maps Discord names to emojis', () => {
  assert.equal(emoji.grinning, '😀');
  assert.equal(emoji.dog, '🐶');
  assert.equal(emoji.airplane, '✈️');
  assert.equal(emoji.eight_pointed_black_star, '✴️');
  assert.equal(emoji.flag_us, '🇺🇸');
});

test('leaves out skin tone variants', () => {
  assert.ok(Object.values(emoji).every((symbol) => !/[\u{1F3FB}-\u{1F3FF}]/u.test(symbol)));
});

test('loads the same table through require()', () => {
  assert.deepEqual(require('@asger-finding/discord_emoji'), emoji);
});

test('types each name as its emoji', () => {
  const grinning: '😀' = emoji.grinning;
  // @ts-expect-error The typings reject names Discord does not have.
  const missing: unknown = emoji.not_an_emoji;
  assert.equal(grinning, '😀');
  assert.equal(missing, undefined);
});
