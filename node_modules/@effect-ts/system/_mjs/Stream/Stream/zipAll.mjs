// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { zipAllWith_ } from "./zipAllWith.mjs";
/**
 * Zips this stream with another point-wise, creating a new stream of pairs of elements
 * from both sides.
 *
 * The defaults `defaultLeft` and `defaultRight` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 */

export function zipAll_(self, that, defaultLeft, defaultRight) {
  return zipAllWith_(self, that, _ => Tp.tuple(_, defaultRight), _ => Tp.tuple(defaultLeft, _), Tp.tuple);
}
/**
 * Zips this stream with another point-wise, creating a new stream of pairs of elements
 * from both sides.
 *
 * The defaults `defaultLeft` and `defaultRight` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * @ets_data_first zipAll_
 */

export function zipAll(that, defaultLeft, defaultRight) {
  return self => zipAll_(self, that, defaultLeft, defaultRight);
}
//# sourceMappingURL=zipAll.mjs.map