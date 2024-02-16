import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Halts the stream with given cause if it does not produce a value after d duration.
 */

export function timeoutErrorCause(cause) {
  return d => self => new Stream(M.map_(self.proc, next => T.chain_(T.timeout_(next, d), O.fold(() => Pull.halt(cause), a => Pull.emitChunk(a)))));
}
//# sourceMappingURL=timeoutErrorCause.mjs.map