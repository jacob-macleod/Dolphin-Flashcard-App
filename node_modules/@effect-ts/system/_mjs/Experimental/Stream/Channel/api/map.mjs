// ets_tracing: off
import * as C from "../core.mjs";
import * as Succeed from "./succeed.mjs";
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified function to the terminal value of this
 * channel.
 */

export function map_(self, f) {
  return C.chain_(self, z => Succeed.succeed(f(z)));
}
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified function to the terminal value of this
 * channel.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
//# sourceMappingURL=map.mjs.map