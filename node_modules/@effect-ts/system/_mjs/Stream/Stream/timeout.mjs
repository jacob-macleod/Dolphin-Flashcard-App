import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Ends the stream if it does not produce a value after d duration.
 */

export function timeout_(self, d) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "timeout", () => T.toManaged(Ref.makeRef(false))), "next", () => self.proc), "pull", ({
    next,
    timeout
  }) => T.chain_(timeout.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(T.timeout_(next, d), O.fold(() => T.zipRight_(timeout.set(true), Pull.end), a => Pull.emitChunk(a)));
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Ends the stream if it does not produce a value after d duration.
 */

export function timeout(d) {
  return self => timeout_(self, d);
}
//# sourceMappingURL=timeout.mjs.map