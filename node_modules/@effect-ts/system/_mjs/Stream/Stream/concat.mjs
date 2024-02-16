// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Ref from "../../Ref/index.mjs";
import * as Pull from "../../Stream/Pull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 */

export function concat_(self, that) {
  return new Stream(M.map_(M.let_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "currStream", () => T.toManaged(Ref.makeRef(Pull.end))), "switchStream", () => M.switchable()), "switched", () => T.toManaged(Ref.makeRef(false))), ({
    currStream,
    switchStream
  }) => T.toManaged(T.chain_(switchStream(self.proc), currStream.set))), "pull", ({
    currStream,
    switchStream,
    switched
  }) => {
    const go = T.catchAllCause_(T.flatten(currStream.get), _ => O.fold_(C.sequenceCauseOption(_), () => T.chain_(Ref.getAndSet_(switched, true), _ => {
      if (_) {
        return Pull.end;
      } else {
        return T.zipRight_(T.chain_(switchStream(that.proc), currStream.set), go);
      }
    }), e => Pull.halt(e)));
    return go;
  }), ({
    pull
  }) => pull));
}
/**
 * Concatenates the specified stream with this stream, resulting in a stream
 * that emits the elements from this stream and then the elements from the specified stream.
 */

export function concat(that) {
  return self => concat_(self, that);
}
//# sourceMappingURL=concat.mjs.map