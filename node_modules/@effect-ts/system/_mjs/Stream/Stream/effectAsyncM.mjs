import { pipe } from "../../Function/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import * as Take from "../Take/index.mjs";
import { chain } from "./chain.mjs";
import { managed } from "./managed.mjs";
import { repeatEffectChunkOption } from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times
 * The registration of the callback itself returns an effect. The optionality of the
 * error type `E` can be used to signal the end of the stream, by setting it to `None`.
 */

export function effectAsyncM(register, outputBuffer = 16) {
  return chain(repeatEffectChunkOption)(managed(M.map_(M.let_(M.bind_(M.tap_(M.bind_(M.bind_(M.do, "output", () => T.toManaged(Q.makeBounded(outputBuffer))), "runtime", () => T.toManaged(T.runtime())), ({
    output,
    runtime
  }) => T.toManaged(register((k, cb) => (x => runtime.runCancel(x, cb))(T.chain_(Take.fromPull(k), x => Q.offer_(output, x)))))), "done", () => Ref.makeManagedRef(false)), "pull", ({
    done,
    output
  }) => T.chain_(done.get, b => b ? Pull.end : T.onError_(T.chain_(Q.take(output), Take.done), () => T.chain_(done.set(true), () => Q.shutdown(output))))), ({
    pull
  }) => pull)));
}
//# sourceMappingURL=effectAsyncM.mjs.map