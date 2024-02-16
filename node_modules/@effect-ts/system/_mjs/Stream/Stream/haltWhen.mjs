// ets_tracing: off
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Pull from "../../Stream/Pull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 */

export function haltWhen_(self, io) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "as", () => self.proc), "runIO", () => T.forkManaged(io)), ({
    as,
    runIO
  }) => T.chain_(runIO.poll, O.fold(() => as, Ex.fold(cause => Pull.halt(cause), _ => Pull.end)))));
}
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 */

export function haltWhen(io) {
  return self => haltWhen_(self, io);
}
//# sourceMappingURL=haltWhen.mjs.map