// ets_tracing: off
import * as Tp from "../../Tuple/index.mjs";
import { zipWith_ } from "./zipWith.mjs";
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 */

export function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @ets_data_first zip_
 */

export function zip(that) {
  return self => zip_(self, that);
}
//# sourceMappingURL=zip.mjs.map