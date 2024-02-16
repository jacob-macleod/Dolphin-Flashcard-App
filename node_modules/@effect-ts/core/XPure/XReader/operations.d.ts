import type * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import type { XReader } from "./definition.js";
/**
 * Lift a sync (non failable) computation
 */
export declare const succeedWith: <A>(f: () => A) => XReader<unknown, A>;
/**
 * Reads the current context
 */
export declare const environment: <R>() => XReader<R, R>;
/**
 * Projects a value from the global context in a Reader
 */
export declare const access: <R, A>(f: (r: R) => A) => XReader<R, A>;
/**
 * Changes the value of the local context during the execution of the action `ma`
 */
export declare const provideSome: <Q, R>(f: (d: Q) => R) => <A>(ma: XReader<R, A>) => XReader<Q, A>;
/**
 * Combines this computation with the specified computation.
 */
export declare const zip: <R1, B>(fb: XReader<R1, B>) => <R, A>(fa: XReader<R, A>) => XReader<R & R1, Tp.Tuple<[A, B]>>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare const chain: <A, R1, B>(f: (a: A) => XReader<R1, B>) => <R>(self: XReader<R, A>) => XReader<R & R1, B>;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */
export declare const map: <A, B>(f: (a: A) => B) => <R>(self: XReader<R, A>) => XReader<R, B>;
/**
 * Succeed with a value A
 */
export declare const succeed: <A>(a: A) => XReader<unknown, A>;
/**
 * Run the computation
 */
export declare const run: <A>(self: XReader<unknown, A>) => A;
/**
 * Run the computation with environment R
 */
export declare const runEnv: <R>(r: R) => <A>(self: XReader<R, A>) => A;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare const tap: <A, R1>(f: (a: A) => XReader<R1, any>) => <R>(self: XReader<R, A>) => XReader<R & R1, A>;
//# sourceMappingURL=operations.d.ts.map