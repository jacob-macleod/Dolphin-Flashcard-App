import { makeOrd } from "@effect-ts/system/Ord";
import * as A from "../Associative/index.mjs";
import * as I from "../Identity/index.mjs";
import { Associative as OrderingAssociative } from "../Ordering/index.mjs";
/**
 * Returns a `Associative` such that:
 *
 * - its `combine(ord2)(ord1)` operation will order first by `ord1`, and then by `ord2`
 */

export function getAssociative() {
  return A.makeAssociative((x, y) => makeOrd((a, b) => OrderingAssociative.combine(x.compare(a, b), y.compare(a, b))));
}
/**
 * Returns a `Identity` such that:
 *
 * - its `combine(ord2)(ord1)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 */

export function getIdentity() {
  return I.makeIdentity(makeOrd(() => 0), getAssociative().combine);
}
/**
 * Order by first, second, third, etc
 */

export function consecutive(...ords) {
  return I.fold(getIdentity())(ords);
}
//# sourceMappingURL=operations.mjs.map