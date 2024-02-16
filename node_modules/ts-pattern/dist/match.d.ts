import { Match } from './types/Match.js';
import * as symbols from './internals/symbols.js';
/**
 * `match` creates a **pattern matching expression**.
 *
 * Use `.with(pattern, handler)` to pattern match on the input.
 *
 * Use `.exhaustive()` or `.otherwise(() => defaultValue)` to end the expression and get the result.
 *
 * [Read documentation for `match` on GitHub](https://github.com/gvergnaud/ts-pattern#match)
 *
 * @example
 *  declare let input: "A" | "B";
 *
 *  return match(input)
 *    .with("A", () => "It's a A!")
 *    .with("B", () => "It's a B!")
 *    .exhaustive();
 *
 */
export declare function match<input extends [any, ...any], output = symbols.unset>(value: input): Match<input, output>;
export declare function match<input, output = symbols.unset>(value: input): Match<input, output>;
