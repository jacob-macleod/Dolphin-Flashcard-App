// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as ZipAllWithExec from "./zipAllWithExec.mjs";
/**
 * Zips this stream with another point-wise. The provided functions will be used to create elements
 * for the composed stream.
 *
 * The functions `left` and `right` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 */

export function zipAllWith_(self, that, left, right, both) {
  return ZipAllWithExec.zipAllWithExec_(self, that, T.parallel, left, right, both);
}
/**
 * Zips this stream with another point-wise. The provided functions will be used to create elements
 * for the composed stream.
 *
 * The functions `left` and `right` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * @ets_data_first zipAllWith_
 */

export function zipAllWith(that, left, right, both) {
  return self => zipAllWith_(self, that, left, right, both);
}
//# sourceMappingURL=zipAllWith.mjs.map