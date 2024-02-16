// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as ZipAllWith from "./zipAllWith.mjs";
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 */

export function zipAllRight_(self, that, default_) {
  return ZipAllWith.zipAllWith_(self, that, _ => default_, identity, (_, o) => o);
}
/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 *
 * @ets_data_first zipAllRight_
 */

export function zipAllRight(that, default_) {
  return self => zipAllRight_(self, that, default_);
}
//# sourceMappingURL=zipAllRight.mjs.map