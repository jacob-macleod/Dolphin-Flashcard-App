import { NoSuchElementException } from "../GlobalExceptions/index.js";
import * as O from "../Option/index.js";
import type { IO } from "./effect.js";
/**
 * Lifts an Option into an Effect, if the option is not defined it fails with NoSuchElementException.
 */
export declare function getOrFail<A>(v: O.Option<A>, __trace?: string): IO<NoSuchElementException, A>;
/**
 * Lifts an Option into a IO, if the option is not defined it fails with Unit.
 */
export declare function getOrFailUnit<A>(v: O.Option<A>, __trace?: string): IO<void, A>;
//# sourceMappingURL=getOrFail.d.ts.map