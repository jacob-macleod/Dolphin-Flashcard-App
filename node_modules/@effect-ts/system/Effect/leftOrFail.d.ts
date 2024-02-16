import * as E from "../Either/index.js";
import { NoSuchElementException } from "../GlobalExceptions/index.js";
import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 */
export declare function leftOrFail_<R, E, B, C, E1>(self: Effect<R, E, E.Either<B, C>>, orFail: (c: C) => E1, __trace?: string): Effect<R, E | E1, B>;
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 *
 * @ets_data_first leftOrFail_
 */
export declare function leftOrFail<C, E1>(orFail: (c: C) => E1, __trace?: string): <R, E, B>(self: Effect<R, E, E.Either<B, C>>) => Effect<R, E1 | E, B>;
/**
 * Returns a successful effect if the value is `Left`, or fails with a `NoSuchElementException`.
 */
export declare function leftOrFailException<R, E, B, C>(self: Effect<R, E, E.Either<B, C>>, __trace?: string): Effect<R, NoSuchElementException | E, B>;
/**
 * Returns a successful effect if the value is `Left`, or fails with the error `None`.
 */
export declare function left<R, E, B, C>(self: Effect<R, E, E.Either<B, C>>): Effect<R, O.Option<E>, B>;
//# sourceMappingURL=leftOrFail.d.ts.map