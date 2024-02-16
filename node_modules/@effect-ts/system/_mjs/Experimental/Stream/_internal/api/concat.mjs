// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 */

export function concat_(self, that) {
  return new C.Stream(CH.zipRight_(self.channel, that.channel));
}
/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 *
 * @ets_data_first concat_
 */

export function concat(that) {
  return self => concat_(self, that);
}
//# sourceMappingURL=concat.mjs.map