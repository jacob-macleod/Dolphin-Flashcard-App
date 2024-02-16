// ets_tracing: off
import { identity } from "../../Function/index.mjs";
import { zipAllWith_ } from "./zipAllWith.mjs";
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 */

export function zipAllRight_(self, that, default_) {
  return zipAllWith_(self, that, _ => default_, identity, (_, o2) => o2);
}
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 *
 * @ets_data_first zipAllRight_
 */

export function zipAllRight(that, default_) {
  return self => zipAllRight_(self, that, default_);
}
//# sourceMappingURL=zipAllRight.mjs.map