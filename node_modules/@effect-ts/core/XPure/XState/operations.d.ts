import type * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import type { XState } from "./definition.js";
/**
 * Combines this computation with the specified computation.
 */
export declare const zip: <S, B>(fb: XState<S, B>) => <A>(fa: XState<S, A>) => XState<S, Tp.Tuple<[A, B]>>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare const chain: <S, A, B>(f: (a: A) => XState<S, B>) => (self: XState<S, A>) => XState<S, B>;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */
export declare const map: <A, B>(f: (a: A) => B) => <S>(self: XState<S, A>) => XState<S, B>;
/**
 * Succeed with a value A
 */
export declare const succeed: <S, A>(a: A) => XState<S, A>;
/**
 * Run the computation with input S returning updated state and output
 */
export declare const run: <S>(s: S) => <A>(self: XState<S, A>) => Tp.Tuple<[S, A]>;
/**
 * Run the computation with input S returning the updated state and discarding the output
 */
export declare const runState: <S>(s: S) => <A>(self: XState<S, A>) => S;
/**
 * Run the computation with input S returning the state and discarding the updated state
 */
export declare const runResult: <S>(r: S) => <A>(self: XState<S, A>) => A;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare const tap: <A, S>(f: (a: A) => XState<S, any>) => (self: XState<S, A>) => XState<S, A>;
//# sourceMappingURL=operations.d.ts.map