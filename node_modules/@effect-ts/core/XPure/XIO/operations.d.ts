import type * as Tp from "@effect-ts/system/Collections/Immutable/Tuple";
import type { XIO } from "./definition.js";
/**
 * Lift a sync (non failable) computation
 */
export declare const succeedWith: <A>(f: () => A) => XIO<A>;
/**
 * Combines this computation with the specified computation.
 */
export declare const zip: <B>(fb: XIO<B>) => <A>(fa: XIO<A>) => XIO<Tp.Tuple<[A, B]>>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare const chain: <A, B>(f: (a: A) => XIO<B>) => (self: XIO<A>) => XIO<B>;
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>`
 *  whose argument and return types use the type constructor `F` to represent
 *  some computational context.
 */
export declare const map: <A, B>(f: (a: A) => B) => <R>(self: XIO<A>) => XIO<B>;
/**
 * Succeed with a value A
 */
export declare const succeed: <A>(a: A) => XIO<A>;
/**
 * Run the computation
 */
export declare const run: <A>(self: XIO<A>) => A;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare const tap: <A>(f: (a: A) => XIO<any>) => (self: XIO<A>) => XIO<A>;
//# sourceMappingURL=operations.d.ts.map