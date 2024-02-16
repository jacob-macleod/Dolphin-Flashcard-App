import { identity } from "../../../Function/index.mjs";
import * as ZipAllSortedByKeyWith from "./zipAllSortedByKeyWith.mjs";
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Keeps only values from this stream, using the
 * specified value `default` to fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */

export function zipAllSortedByKeyLeft_(self, that, default_, ord) {
  return ZipAllSortedByKeyWith.zipAllSortedByKeyWith_(self, that, identity, _ => default_, (a, _) => a, ord);
}
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Keeps only values from this stream, using the
 * specified value `default` to fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKeyLeft_
 */

export function zipAllSortedByKeyLeft(that, default_, ord) {
  return self => zipAllSortedByKeyLeft_(self, that, default_, ord);
}
//# sourceMappingURL=zipAllSortedByKeyLeft.mjs.map