import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import * as Take from "../Take/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback can possibly return the stream synchronously.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */

export function effectAsyncMaybe(register, outputBuffer = 16) {
  return new Stream(M.map_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "output", () => T.toManaged(Q.makeBounded(outputBuffer))), "runtime", () => T.toManaged(T.runtime())), "maybeStream", ({
    output,
    runtime
  }) => M.succeedWith(() => register((k, cb) => (x => runtime.runCancel(x, cb))(T.chain_(Take.fromPull(k), x => Q.offer_(output, x)))))), "pull", ({
    maybeStream,
    output
  }) => O.fold_(maybeStream, () => M.map_(M.bind_(M.do, "done", () => Ref.makeManagedRef(false)), ({
    done
  }) => T.chain_(done.get, b => b ? Pull.end : T.onError_(T.chain_(Q.take(output), Take.done), () => T.chain_(done.set(true), () => Q.shutdown(output))))), s => M.chain_(T.toManaged(Q.shutdown(output)), () => s.proc))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=effectAsyncMaybe.mjs.map