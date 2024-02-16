import type { Effect } from "./effect.js";
/**
 * Loops with the specified effectual function, collecting the results into a
 * list. The moral equivalent of:
 *
 * ```
 * let s  = initial
 * let as = [] as readonly A[]
 *
 * while (cont(s)) {
 *   as = [body(s), ...as]
 *   s  = inc(s)
 * }
 *
 * A.reverse(as)
 * ```
 */
export declare function loop<Z>(initial: Z, cont: (z: Z) => boolean, inc: (z: Z) => Z): <R, E, A>(body: (z: Z) => Effect<R, E, A>, __trace?: string | undefined) => Effect<R, E, readonly A[]>;
/**
 * Loops with the specified effectual function purely for its effects. The
 * moral equivalent of:
 *
 * ```
 * var s = initial
 *
 * while (cont(s)) {
 *   body(s)
 *   s = inc(s)
 * }
 * ```
 */
export declare function loopUnit<Z>(initial: Z, cont: (z: Z) => boolean, inc: (z: Z) => Z): <R, E, X>(body: (z: Z) => Effect<R, E, X>, __trace?: string | undefined) => Effect<R, E, void>;
//# sourceMappingURL=loop.d.ts.map