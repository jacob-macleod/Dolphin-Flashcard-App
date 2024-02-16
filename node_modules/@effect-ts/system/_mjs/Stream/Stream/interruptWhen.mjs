// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as F from "../_internal/fiber.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 */

export function interruptWhen_(self, io) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "as", () => self.proc), "runIO", () => T.forkManaged(T.zipRight_(T.asSomeError(io), T.fail(O.none)))), ({
    as,
    runIO
  }) => T.transplant(graft => T.raceFirst_(T.disconnect(F.join(runIO)), graft(as)))));
}
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 */

export function interruptWhen(io) {
  return self => interruptWhen_(self, io);
}
//# sourceMappingURL=interruptWhen.mjs.map