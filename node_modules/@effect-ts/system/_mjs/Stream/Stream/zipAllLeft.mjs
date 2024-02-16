// ets_tracing: off
import { identity } from "../../Function/index.mjs";
import { zipAllWith_ } from "./zipAllWith.mjs";
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 */

export function zipAllLeft_(self, that, default_) {
  return zipAllWith_(self, that, identity, _ => default_, o => o);
}
/**
 * Zips this stream with another point-wise, and keeps only elements from this stream.
 *
 * The provided default value will be used if the other stream ends before this one.
 *
 * @ets_data_first zipAllLeft_
 */

export function zipAllLeft(that, default_) {
  return self => zipAllLeft_(self, that, default_);
}
//# sourceMappingURL=zipAllLeft.mjs.map