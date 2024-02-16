// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as WhenEffect from "./whenEffect.mjs";
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 */

export function when_(stream, b) {
  return WhenEffect.whenEffect_(stream, T.succeed(b()));
}
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 *
 * @ets_data_first when_
 */

export function when(b) {
  return stream => when_(stream, b);
}
//# sourceMappingURL=when.mjs.map