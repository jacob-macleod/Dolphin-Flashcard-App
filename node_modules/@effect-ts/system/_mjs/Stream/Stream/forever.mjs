// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Pull from "../../Stream/Pull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
export function forever(self) {
  return new Stream(M.map_(M.tap_(M.bind_(M.bind_(M.do, "currStream", () => T.toManaged(Ref.makeRef(Pull.end))), "switchStream", () => M.switchable()), ({
    currStream,
    switchStream
  }) => {
    return T.toManaged(T.chain_(switchStream(self.proc), currStream.set));
  }), ({
    currStream,
    switchStream
  }) => {
    const go = T.catchAllCause_(T.flatten(currStream.get), _ => O.fold_(C.sequenceCauseOption(_), () => T.zipRight_(T.chain_(switchStream(self.proc), currStream.set), go), e => Pull.halt(e)));
    return go;
  }));
}
//# sourceMappingURL=forever.mjs.map