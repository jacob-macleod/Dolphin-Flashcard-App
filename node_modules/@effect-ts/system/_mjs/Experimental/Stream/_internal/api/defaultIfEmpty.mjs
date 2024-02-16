// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Switches to the provided stream in case this one is empty.
 */

function defaultIfEmptyStream(self, stream) {
  const writer = () => CH.readWith(in_ => CK.isEmpty(in_) ? writer() : CH.zipRight_(CH.write(in_), CH.identity()), e => CH.fail(e), _ => stream.channel);

  return new C.Stream(self.channel[">>>"](writer()));
}
/**
 * Produces the specified chunk if this stream is empty.
 */


function defaultIfEmptyChunk(self, chunk) {
  return defaultIfEmptyStream(self, new C.Stream(CH.write(chunk)));
}
/**
 * Produces the specified element if this stream is empty.
 */


function defaultIfEmptyValue(self, a) {
  return defaultIfEmptyChunk(self, CK.single(a));
}

export function defaultIfEmpty_(self, emptyValue) {
  if (CK.isChunk(emptyValue)) {
    return defaultIfEmptyChunk(self, emptyValue);
  }

  if (C.isStream(emptyValue)) {
    return defaultIfEmptyStream(self, emptyValue);
  }

  return defaultIfEmptyValue(self, emptyValue);
}
export function defaultIfEmpty(emptyValue) {
  return self => defaultIfEmpty_(self, emptyValue);
}
//# sourceMappingURL=defaultIfEmpty.mjs.map