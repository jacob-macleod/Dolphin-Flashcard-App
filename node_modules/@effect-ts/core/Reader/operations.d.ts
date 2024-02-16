import * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import type { Reader } from "./definition.js";
/**
 * Lift a sync (non failable) computation
 */
export declare const sync: <A>(f: () => A) => Reader<unknown, A>;
/**
 * Reads the current context
 */
export declare const environment: <R>() => Reader<R, R>;
/**
 * Projects a value from the global context in a Reader
 */
export declare const access: <R, A>(f: (r: R) => A) => Reader<R, A>;
/**
 * Changes the value of the local context during the execution of the action `ma`
 */
export declare const provideSome: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A>;
/**
 * Combines this computation with the specified computation.
 */
export declare const zip: <R1, B>(fb: Reader<R1, B>) => <R, A>(fa: Reader<R, A>) => Reader<R & R1, Tp.Tuple<[A, B]>>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare const chain: <A, R1, B>(f: (a: A) => Reader<R1, B>) => <R>(self: Reader<R, A>) => Reader<R & R1, B>;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */
export declare const map: <A, B>(f: (a: A) => B) => <R>(self: Reader<R, A>) => Reader<R, B>;
/**
 * Succeed with a value A
 */
export declare const succeed: <A>(a: A) => Reader<unknown, A>;
/**
 * Run the computation
 */
export declare const run: <A>(self: Reader<unknown, A>) => A;
/**
 * Run the computation with environment R
 */
export declare const runEnv: <R>(r: R) => <A>(self: Reader<R, A>) => A;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare const tap: <A, R1>(f: (a: A) => Reader<R1, any>) => <R>(self: Reader<R, A>) => Reader<R & R1, A>;
//# sourceMappingURL=operations.d.ts.map