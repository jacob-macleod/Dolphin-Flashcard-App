// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as Tp from "../../Tuple/index.mjs";
import { zipAllWith_ } from "./zipAllWith.mjs";
/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 */

export function zipAll_(self, that) {
  return zipAllWith_(self, that, (a, b) => Tp.tuple(O.some(a), O.some(b)), a => Tp.tuple(O.some(a), O.none), b => Tp.tuple(O.none, O.some(b)));
}
/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 *
 * @ets_data_first zipAll_
 */

export function zipAll(that) {
  return self => zipAll_(self, that);
}
//# sourceMappingURL=zipAll.mjs.map