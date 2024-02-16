import type { Ord } from "@effect-ts/system/Ord";
import * as A from "../Associative/index.js";
import * as I from "../Identity/index.js";
/**
 * Returns a `Associative` such that:
 *
 * - its `combine(ord2)(ord1)` operation will order first by `ord1`, and then by `ord2`
 */
export declare function getAssociative<A = never>(): A.Associative<Ord<A>>;
/**
 * Returns a `Identity` such that:
 *
 * - its `combine(ord2)(ord1)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 */
export declare function getIdentity<A = never>(): I.Identity<Ord<A>>;
/**
 * Order by first, second, third, etc
 */
export declare function consecutive<A>(...ords: Ord<A>[]): Ord<A>;
//# sourceMappingURL=operations.d.ts.map