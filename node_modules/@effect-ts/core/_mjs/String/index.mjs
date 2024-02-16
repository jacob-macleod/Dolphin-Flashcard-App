// ets_tracing: off
import "../Operator/index.mjs";
import * as C from "../Closure/index.mjs";
/**
 * Partially Ported from https://github.com/samhh/fp-ts-std
 * Partially Ported from https://github.com/0x706b/principia
 */

import * as A from "../Collections/Immutable/Array/index.mjs";
import * as NA from "../Collections/Immutable/NonEmptyArray/index.mjs";
import * as Eq from "../Equal/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as I from "../Identity/index.mjs";
import { StringSum } from "../Newtype/index.mjs";
import * as O from "../Option/index.mjs";
export const SumClosure = /*#__PURE__*/C.makeClosure((l, r) => `${l}${r}`);
export const SumIdentity = /*#__PURE__*/I.makeIdentity("", SumClosure.combine);
export const Equal = /*#__PURE__*/Eq.strict();
/**
 * Check if a value is a string
 */

export function isString(u) {
  return typeof u === "string";
}
/**
 * Check is a string is empty
 */

export function isEmpty(s) {
  return s === "";
}
/**
 * Check if a string contains the given substring
 */

export function includes_(s, substr) {
  return s.includes(substr);
}
/**
 * Check if a string contains the given substring
 *
 * @ets_data_first includes_
 */

export function includes(substr) {
  return s => s.includes(substr);
}
/**
 * Check if a string starts with the given substring
 */

export function startsWith_(s, substr) {
  return s.startsWith(substr);
}
/**
 * Check if a string starts with the given substring
 *
 * @ets_data_first startsWith_
 */

export function startsWith(substr) {
  return s => startsWith_(s, substr);
}
/**
 * Check if a string ends with the given substring
 */

export function endsWith_(s, substr) {
  return s.endsWith(substr);
}
/**
 * Check if a string ends with the given substring
 *
 * @ets_data_first endsWith_
 */

export function endsWith(substr) {
  return s => endsWith_(s, substr);
}
/**
 * The empty string
 */

export const empty = "";
/**
 * Converts a number into a string
 */

export function fromNumber(x) {
  return String(x);
}
/**
 * Trim whitespace from both sides of a string
 */

export function trim(s) {
  return s.trim();
}
/**
 * Trim whitespace from the left side of the string
 */

export function trimLeft(s) {
  return s.trimStart();
}
/**
 * Trim whitespace from the right side of the string
 */

export function trimRight(s) {
  return s.trimEnd();
}
/**
 * Prepend one string to another
 */

export function prepend_(s, prepend) {
  return prepend + s;
}
/**
 * Prepend one string to another
 *
 * @ets_data_first prepend_
 */

export function prepend(prepend) {
  return s => prepend + s;
}
/**
 * Removes the given string from the beginning, if it exists
 */

export function unprepend_(s, s1) {
  return s.startsWith(s1) ? s.substr(s1.length) : s;
}
/**
 * Removes the given string from the beginning, if it exists
 *
 * @ets_data_first unprepend_
 */

export function unprepend(s1) {
  return s => unprepend_(s, s1);
}
/**
 * Append one string to another.
 */

export function append_(s, x) {
  return s + x;
}
/**
 * Append one string to another.
 *
 * @ets_data_first append_
 */

export function append(x) {
  return s => s + x;
}
/**
 * Remove the end of a string, if it exists.
 */

export function unappend_(s, x) {
  return s.endsWith(x) ? s.substring(0, s.lastIndexOf(x)) : s;
}
/**
 * Remove the end of a string, if it exists.
 *
 * @ets_data_first unappend_
 */

export function unappend(x) {
  return s => unappend_(s, x);
}
/**
 * Surround a string. Equivalent to calling `prepend` and `append` with the
 * same outer value.
 */

export function surround_(s, x) {
  return append(x)(prepend(x)(s));
}
/**
 * Surround a string. Equivalent to calling `prepend` and `append` with the
 * same outer value.
 *
 * @ets_data_first surround_
 */

export function surround(x) {
  return s => surround_(s, x);
}
/**
 * Remove the start and end of a string, if they both exist.
 */

export function unsurround_(s, x) {
  return s.startsWith(x) && s.endsWith(x) ? unappend(x)(unprepend(x)(s)) : s;
}
/**
 * Remove the start and end of a string, if they both exist.
 *
 * @ets_data_first unsurround_
 */

export function unsurround(x) {
  return s => unsurround_(s, x);
}
/**
 * Returns the substring between the start index (inclusive) and the end index
 * (exclusive).
 */

export function slice_(s, start, end) {
  return s.slice(start, end);
}
/**
 * Returns the substring between the start index (inclusive) and the end index
 * (exclusive).
 *
 * @ets_data_first slice_
 */

export function slice(start, end) {
  return s => s.slice(start, end);
}
/**
 * Keep the specified number of characters from the start of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 */

export function takeLeft_(s, n) {
  return s.slice(0, Math.max(n, 0));
}
/**
 * Keep the specified number of characters from the start of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @ets_data_first takeLeft_
 */

export function takeLeft(n) {
  return s => takeLeft_(s, n);
}
/**
 * Keep the specified number of characters from the end of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 */

export function takeRight_(s, n) {
  return s.slice(Math.max(0, s.length - Math.floor(n)), Infinity);
}
/**
 * Keep the specified number of characters from the end of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @ets_data_first takeRight_
 */

export function takeRight(n) {
  return s => takeRight_(s, n);
}
/**
 * Match a string with a RegExp
 */

export function match_(s, r) {
  return O.fromNullable(s.match(r));
}
/**
 * Match a string with a RegExp
 *
 * @ets_data_first match_
 */

export function match(r) {
  return s => match_(s, r);
}
/**
 * Match a string with a global RegExp
 */

export function matchAll_(s, r) {
  return O.chain_(O.fromNullable(s.matchAll(r)), x => NA.fromArray(A.from(x)));
}
/**
 * Matches a string with a global RegExp
 *
 * @ets_data_first matchAll_
 */

export function matchAll(r) {
  return s => matchAll_(s, r);
}
/**
 * Split a string into substrings using the specified separator and return them
 * as an array.
 */

export function split_(s, on) {
  return s.split(on);
}
/**
 * Split a string into substrings using the specified separator and return them
 * as an array.
 *
 * @ets_data_first split_
 */

export function split(on) {
  return s => s.split(on);
}
/**
 * Apply an endomorphism upon an array of characters against a string.
 * This is useful as it allows you to run many polymorphic functions targeting
 * arrays against strings without having to rewrite them.
 */

export function under_(s, f) {
  return A.join_(f(split("")(s)), "");
}
/**
 * Apply an endomorphism upon an array of characters against a string.
 * This is useful as it allows you to run many polymorphic functions targeting
 * arrays against strings without having to rewrite them.
 *
 * @ets_data_first under_
 */

export function under(f) {
  return s => under_(s, f);
}
/**
 * Reverse a string
 */

export function reverse(s) {
  return under_(s, A.reverse);
}
/**
 * Split a string into substrings using any recognised newline as the separator.
 */

export function lines(s) {
  return split_(s, /\r\n|\r|\n/);
}
/**
 * Join newline-separated strings together.
 */

export function unlines(as) {
  return A.join_(as, "\n");
}
/**
 * Test a string with a RegExp
 */

export function test_(s, r) {
  return r.test(s);
}
/**
 * Test a string with a RegExp
 *
 * @ets_data_first test_
 */

export function test(r) {
  return s => r.test(s);
}
/**
 * Replace the first (or all, with a global RegExp) occurrence of a matched substring with a replacement.
 */

export function replace_(s, test, r) {
  return s.replace(test, r);
}
/**
 * Replace the first (or all, with a global RegExp) occurrence of a matched substring with a replacement.
 *
 * @ets_data_first replace_
 */

export function replace(test, r) {
  return s => s.replace(test, r);
}
export class LinesIterator {
  constructor(s, stripped = false) {
    this.s = s;
    this.stripped = stripped;
    this.index = 0;
    this.length = s.length;
  }

  next() {
    if (this.done()) {
      return {
        done: true,
        value: undefined
      };
    }

    const start = this.index;

    while (!this.done() && !this.isLineBreak(this.s[this.index])) {
      this.index = this.index + 1;
    }

    let end = this.index;

    if (!this.done()) {
      const char = this.s[this.index];
      this.index = this.index + 1;

      if (!this.done() && this.isLineBreak2(char, this.s[this.index])) {
        this.index = this.index + 1;
      }

      if (!this.stripped) {
        end = this.index;
      }
    }

    return {
      done: false,
      value: this.s.substring(start, end)
    };
  }

  [Symbol.iterator]() {
    return new LinesIterator(this.s, this.stripped);
  }

  done() {
    return this.index >= this.length;
  }
  /**
   * Test if the provided character is a line break character (i.e. either `"\r"`
   * or `"\n"`).
   */


  isLineBreak(char) {
    const code = char.charCodeAt(0);
    return code === LinesIterator.CR || code === LinesIterator.LF;
  }
  /**
   * Test if the provided characters combine to form a carriage return/line-feed
   * (i.e. `"\r\n"`).
   */


  isLineBreak2(char0, char1) {
    return char0.charCodeAt(0) === LinesIterator.CR && char1.charCodeAt(0) === LinesIterator.LF;
  }

}
/**
 * Represents the character code of a carriage return character (`"\r"`).
 */

LinesIterator.CR = 0x0d;
/**
 * Represents the character code of a line-feed character (`"\n"`).
 */

LinesIterator.LF = 0x0a;

function linesSeparated(s, stripped) {
  return new LinesIterator(s, stripped);
}

export function linesIterator(s) {
  return linesSeparated(s, true);
}
export function linesWithSeparators(s) {
  return linesSeparated(s, false);
}
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 */

export function stripMargin(str) {
  return stripMarginWith_(str, "|");
}
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 */

export function stripMarginWith_(str, marginChar) {
  let out = "";

  for (const line of linesWithSeparators(str)) {
    let index = 0;

    while (index < line.length && line.charAt(index) <= " ") {
      index += 1;
    }

    const stripped = index < line.length && line.charAt(index) === marginChar ? line.substring(index + 1) : line;
    out += stripped;
  }

  return out;
}
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 *
 * @ets_data_first stripMarginWith_
 */

export function stripMarginWith(marginChar) {
  return str => stripMarginWith_(str, marginChar);
}
/**
 * Converts the string to uppercase
 */

export function toUpperCase(str) {
  return str.toUpperCase();
}
/**
 * Converts the string to uppercase
 */

export function toLowerCase(str) {
  return str.toLowerCase();
}
//# sourceMappingURL=index.mjs.map