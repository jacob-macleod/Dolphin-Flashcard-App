// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as ZipAllWith from "./zipAllWith.mjs";
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 */

export function zipAllLeft_(self, that, default_) {
  return ZipAllWith.zipAllWith_(self, that, identity, _ => default_, (o, _) => o);
}
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 *
 * @ets_data_first zipAllLeft_
 */

export function zipAllLeft(that, default_) {
  return self => zipAllLeft_(self, that, default_);
}
//# sourceMappingURL=zipAllLeft.mjs.map