import "../Operator/index.js";
import * as C from "../Closure/index.js";
/**
 * Partially Ported from https://github.com/samhh/fp-ts-std
 * Partially Ported from https://github.com/0x706b/principia
 */
import * as A from "../Collections/Immutable/Array/index.js";
import * as NA from "../Collections/Immutable/NonEmptyArray/index.js";
import * as Eq from "../Equal/index.js";
import * as I from "../Identity/index.js";
import type { Sum } from "../Newtype/index.js";
import * as O from "../Option/index.js";
export declare const SumClosure: C.Closure<Sum<string>>;
export declare const SumIdentity: I.Identity<Sum<string>>;
export declare const Equal: Eq.Equal<string>;
/**
 * Check if a value is a string
 */
export declare function isString(u: unknown): u is string;
/**
 * Check is a string is empty
 */
export declare function isEmpty(s: string): boolean;
/**
 * Check if a string contains the given substring
 */
export declare function includes_(s: string, substr: string): boolean;
/**
 * Check if a string contains the given substring
 *
 * @ets_data_first includes_
 */
export declare function includes(substr: string): (s: string) => boolean;
/**
 * Check if a string starts with the given substring
 */
export declare function startsWith_(s: string, substr: string): boolean;
/**
 * Check if a string starts with the given substring
 *
 * @ets_data_first startsWith_
 */
export declare function startsWith(substr: string): (s: string) => boolean;
/**
 * Check if a string ends with the given substring
 */
export declare function endsWith_(s: string, substr: string): boolean;
/**
 * Check if a string ends with the given substring
 *
 * @ets_data_first endsWith_
 */
export declare function endsWith(substr: string): (s: string) => boolean;
/**
 * The empty string
 */
export declare const empty = "";
/**
 * Converts a number into a string
 */
export declare function fromNumber(x: number): string;
/**
 * Trim whitespace from both sides of a string
 */
export declare function trim(s: string): string;
/**
 * Trim whitespace from the left side of the string
 */
export declare function trimLeft(s: string): string;
/**
 * Trim whitespace from the right side of the string
 */
export declare function trimRight(s: string): string;
/**
 * Prepend one string to another
 */
export declare function prepend_(s: string, prepend: string): string;
/**
 * Prepend one string to another
 *
 * @ets_data_first prepend_
 */
export declare function prepend(prepend: string): (s: string) => string;
/**
 * Removes the given string from the beginning, if it exists
 */
export declare function unprepend_(s: string, s1: string): string;
/**
 * Removes the given string from the beginning, if it exists
 *
 * @ets_data_first unprepend_
 */
export declare function unprepend(s1: string): (s: string) => string;
/**
 * Append one string to another.
 */
export declare function append_(s: string, x: string): string;
/**
 * Append one string to another.
 *
 * @ets_data_first append_
 */
export declare function append(x: string): (s: string) => string;
/**
 * Remove the end of a string, if it exists.
 */
export declare function unappend_(s: string, x: string): string;
/**
 * Remove the end of a string, if it exists.
 *
 * @ets_data_first unappend_
 */
export declare function unappend(x: string): (s: string) => string;
/**
 * Surround a string. Equivalent to calling `prepend` and `append` with the
 * same outer value.
 */
export declare function surround_(s: string, x: string): string;
/**
 * Surround a string. Equivalent to calling `prepend` and `append` with the
 * same outer value.
 *
 * @ets_data_first surround_
 */
export declare function surround(x: string): (s: string) => string;
/**
 * Remove the start and end of a string, if they both exist.
 */
export declare function unsurround_(s: string, x: string): string;
/**
 * Remove the start and end of a string, if they both exist.
 *
 * @ets_data_first unsurround_
 */
export declare function unsurround(x: string): (s: string) => string;
/**
 * Returns the substring between the start index (inclusive) and the end index
 * (exclusive).
 */
export declare function slice_(s: string, start: number, end: number): string;
/**
 * Returns the substring between the start index (inclusive) and the end index
 * (exclusive).
 *
 * @ets_data_first slice_
 */
export declare function slice(start: number, end: number): (s: string) => string;
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
export declare function takeLeft_(s: string, n: number): string;
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
export declare function takeLeft(n: number): (s: string) => string;
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
export declare function takeRight_(s: string, n: number): string;
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
export declare function takeRight(n: number): (s: string) => string;
/**
 * Match a string with a RegExp
 */
export declare function match_(s: string, r: RegExp): O.Option<RegExpMatchArray>;
/**
 * Match a string with a RegExp
 *
 * @ets_data_first match_
 */
export declare function match(r: RegExp): (s: string) => O.Option<RegExpMatchArray>;
/**
 * Match a string with a global RegExp
 */
export declare function matchAll_(s: string, r: RegExp): O.Option<NA.NonEmptyArray<RegExpMatchArray>>;
/**
 * Matches a string with a global RegExp
 *
 * @ets_data_first matchAll_
 */
export declare function matchAll(r: RegExp): (s: string) => O.Option<NA.NonEmptyArray<RegExpMatchArray>>;
/**
 * Split a string into substrings using the specified separator and return them
 * as an array.
 */
export declare function split_(s: string, on: string | RegExp): A.Array<string>;
/**
 * Split a string into substrings using the specified separator and return them
 * as an array.
 *
 * @ets_data_first split_
 */
export declare function split(on: string | RegExp): (s: string) => A.Array<string>;
/**
 * Apply an endomorphism upon an array of characters against a string.
 * This is useful as it allows you to run many polymorphic functions targeting
 * arrays against strings without having to rewrite them.
 */
export declare function under_(s: string, f: (chars: A.Array<string>) => A.Array<string>): string;
/**
 * Apply an endomorphism upon an array of characters against a string.
 * This is useful as it allows you to run many polymorphic functions targeting
 * arrays against strings without having to rewrite them.
 *
 * @ets_data_first under_
 */
export declare function under(f: (chars: A.Array<string>) => A.Array<string>): (s: string) => string;
/**
 * Reverse a string
 */
export declare function reverse(s: string): string;
/**
 * Split a string into substrings using any recognised newline as the separator.
 */
export declare function lines(s: string): A.Array<string>;
/**
 * Join newline-separated strings together.
 */
export declare function unlines(as: A.Array<string>): string;
/**
 * Test a string with a RegExp
 */
export declare function test_(s: string, r: RegExp): boolean;
/**
 * Test a string with a RegExp
 *
 * @ets_data_first test_
 */
export declare function test(r: RegExp): (s: string) => boolean;
/**
 * Replace the first (or all, with a global RegExp) occurrence of a matched substring with a replacement.
 */
export declare function replace_(s: string, test: string | RegExp, r: string): string;
/**
 * Replace the first (or all, with a global RegExp) occurrence of a matched substring with a replacement.
 *
 * @ets_data_first replace_
 */
export declare function replace(test: string | RegExp, r: string): (s: string) => string;
export declare class LinesIterator implements IterableIterator<string> {
    readonly s: string;
    readonly stripped: boolean;
    /**
     * Represents the character code of a carriage return character (`"\r"`).
     */
    static CR: number;
    /**
     * Represents the character code of a line-feed character (`"\n"`).
     */
    static LF: number;
    private index;
    private length;
    constructor(s: string, stripped?: boolean);
    next(): IteratorResult<string>;
    [Symbol.iterator](): IterableIterator<string>;
    private done;
    /**
     * Test if the provided character is a line break character (i.e. either `"\r"`
     * or `"\n"`).
     */
    private isLineBreak;
    /**
     * Test if the provided characters combine to form a carriage return/line-feed
     * (i.e. `"\r\n"`).
     */
    private isLineBreak2;
}
export declare function linesIterator(s: string): LinesIterator;
export declare function linesWithSeparators(s: string): LinesIterator;
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 */
export declare function stripMargin(str: string): string;
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 */
export declare function stripMarginWith_(str: string, marginChar: string): string;
/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 *
 * @ets_data_first stripMarginWith_
 */
export declare function stripMarginWith(marginChar: string): (str: string) => string;
/**
 * Converts the string to uppercase
 */
export declare function toUpperCase(str: string): string;
/**
 * Converts the string to uppercase
 */
export declare function toLowerCase(str: string): string;
//# sourceMappingURL=index.d.ts.map