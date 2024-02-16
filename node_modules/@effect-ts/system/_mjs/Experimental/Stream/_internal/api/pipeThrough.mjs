import * as C from "../core.mjs";
/**
 * Pipes all of the values from this stream through the provided sink.
 *
 * @see `transduce`
 */

export function pipeThrough(self, sink) {
  return new C.Stream(self.channel[">>>"](sink.channel));
}
//# sourceMappingURL=pipeThrough.mjs.map