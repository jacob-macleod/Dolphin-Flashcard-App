import type { Equal } from "../Equal/index.js";
import type { Ordering } from "../Ordering/index.js";
import type { ForcedTuple } from "../Utils/index.js";
import type { Ord } from "./definition.js";
/**
 * Creates Ord[A] from a compare function
 */
export declare function makeOrd<A>(compare: (x: A, y: A) => Ordering): Ord<A>;
/**
 * Contramap Ord input
 */
export declare function contramap<A, B>(f: (b: B) => A): (fa: Ord<A>) => Ord<B>;
/**
 * Contramap Ord input
 */
export declare function contramap_<A, B>(fa: Ord<A>, f: (b: B) => A): Ord<B>;
/**
 * Test whether one value is _strictly greater than_ another
 */
export declare function gt<A>(O: Ord<A>): (x: A, y: A) => boolean;
/**
 * Test whether one value is _non-strictly less than_ another
 */
export declare function leq<A>(O: Ord<A>): (x: A, y: A) => boolean;
/**
 * Test whether one value is _strictly less than_ another
 */
export declare function lt<A>(O: Ord<A>): (x: A, y: A) => boolean;
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 */
export declare function max<A>(O: Ord<A>): (x: A, y: A) => A;
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 */
export declare function min<A>(O: Ord<A>): (x: A, y: A) => A;
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 */
export declare function between<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => boolean;
/**
 * Clamp a value between a minimum and a maximum
 */
export declare function clamp<A>(O: Ord<A>): (low: A, hi: A) => (x: A) => A;
/**
 * Get the dual of an Ord
 */
export declare function inverted<A>(O: Ord<A>): Ord<A>;
/**
 * Get an instance of Equal
 */
export declare function getEqual<A>(O: Ord<A>): Equal<A>;
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 */
export declare function tuple<T extends ReadonlyArray<Ord<any>>>(...ords: T): Ord<ForcedTuple<{
    [K in keyof T]: T[K] extends Ord<infer A> ? A : never;
}>>;
//# sourceMappingURL=operations.d.ts.map