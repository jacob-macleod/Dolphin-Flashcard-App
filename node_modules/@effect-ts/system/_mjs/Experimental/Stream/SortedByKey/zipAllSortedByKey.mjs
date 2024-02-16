// ets_tracing: off
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as ZipAllSortedByKeyWith from "./zipAllSortedByKeyWith.mjs";
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Combines values associated with each key into a
 * tuple, using the specified values `defaultLeft` and `defaultRight` to
 * fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */

export function zipAllSortedByKey_(self, that, defaultLeft, defaultRight, ord) {
  return ZipAllSortedByKeyWith.zipAllSortedByKeyWith_(self, that, _ => Tp.tuple(_, defaultRight), _ => Tp.tuple(defaultLeft, _), (a, b) => Tp.tuple(a, b), ord);
}
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Combines values associated with each key into a
 * tuple, using the specified values `defaultLeft` and `defaultRight` to
 * fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKey_
 */

export function zipAllSortedByKey(that, defaultLeft, defaultRight, ord) {
  return self => zipAllSortedByKey_(self, that, defaultLeft, defaultRight, ord);
}
//# sourceMappingURL=zipAllSortedByKey.mjs.map