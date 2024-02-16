import * as T from "../../../Effect/index.mjs";
import * as ZipAllSortedByKeyWithExec from "./zipAllSortedByKeyWithExec.mjs";
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Uses the functions `left`, `right`, and `both`
 * to handle the cases where a key and value exist in this stream, that
 * stream, or both streams.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */

export function zipAllSortedByKeyWith_(self, that, left, right, both, ord) {
  return ZipAllSortedByKeyWithExec.zipAllSortedByKeyWithExec_(self, that, left, right, both, ord, T.parallel);
}
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Uses the functions `left`, `right`, and `both`
 * to handle the cases where a key and value exist in this stream, that
 * stream, or both streams.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKeyWith_
 */

export function zipAllSortedByKeyWith(that, left, right, both, ord) {
  return self => zipAllSortedByKeyWith_(self, that, left, right, both, ord);
}
//# sourceMappingURL=zipAllSortedByKeyWith.mjs.map