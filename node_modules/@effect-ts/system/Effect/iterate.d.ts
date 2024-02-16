import type { Effect } from "./effect.js";
/**
 * Iterates with the specified effectual function. The moral equivalent of:
 *
 * ```
 * let s = initial
 *
 * while (cont(s)) {
 *   s = body(s)
 * }
 *
 * return s
 * ```
 */
export declare function iterate<Z>(initial: Z, cont: (z: Z) => boolean): <R, E>(body: (z: Z) => Effect<R, E, Z>, __trace?: string | undefined) => Effect<R, E, Z>;
//# sourceMappingURL=iterate.d.ts.map