// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as TK from "../../Take/index.mjs";
import * as C from "../core.mjs";
import { toEmit } from "./_internal/Emit.mjs";
import * as Ensuring from "./ensuring.mjs";
import * as Unwrap from "./unwrap.mjs";
import * as UnwrapManaged from "./unwrapManaged.mjs";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback returns either a canceler or synchronously returns a stream.
 * The optionality of the error type `E` can be used to signal the end of the stream, by
 * setting it to `None`.
 */

export function asyncInterrupt(register, outputBuffer = 16) {
  return UnwrapManaged.unwrapManaged(M.map_(M.bind_(M.bind_(M.bind_(M.do, "output", () => T.toManagedRelease_(Q.makeBounded(outputBuffer), Q.shutdown)), "runtime", () => M.runtime()), "eitherStream", ({
    output,
    runtime
  }) => M.succeed(register(toEmit(k => {
    try {
      runtime.run(T.chain_(TK.fromPull(k), _ => Q.offer_(output, _)));
    } catch (e) {
      if (CS.isFiberFailure(e)) {
        if (!CS.interrupted(e.cause)) {
          throw e;
        }
      }
    }
  })))), ({
    eitherStream,
    output
  }) => E.fold_(eitherStream, canceler => {
    const loop = CH.unwrap(T.fold_(T.chain_(Q.take(output), _ => TK.done(_)), maybeError => CH.zipRight_(CH.fromEffect(Q.shutdown(output)), O.fold_(maybeError, () => CH.end(undefined), _ => CH.fail(_))), a => CH.zipRight_(CH.write(a), loop)));
    return Ensuring.ensuring_(new C.Stream(loop), canceler);
  }, value => Unwrap.unwrap(T.as_(Q.shutdown(output), value)))));
}
//# sourceMappingURL=asyncInterrupt.mjs.map