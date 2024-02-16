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
/**
 * Creates a stream from an asynchronous callback that can be called multiple times
 * The registration of the callback itself returns an effect. The optionality of the
 * error type `E` can be used to signal the end of the stream, by setting it to `None`.
 */

export function asyncEffect(register, outputBuffer = 16) {
  return new C.Stream(CH.unwrapManaged(M.map_(M.tap_(M.bind_(M.bind_(M.do, "output", () => T.toManagedRelease_(Q.makeBounded(outputBuffer), Q.shutdown)), "runtime", () => M.runtime()), ({
    output,
    runtime
  }) => T.toManaged(register(toEmit(k => {
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
    output
  }) => {
    const loop = CH.unwrap(T.foldCauseM_(T.chain_(Q.take(output), _ => TK.done(_)), maybeError => {
      return T.as_(Q.shutdown(output), E.fold_(CS.failureOrCause(maybeError), l => O.fold_(l, () => CH.end(undefined), failure => CH.fail(failure)), cause => CH.failCause(cause)));
    }, a => T.succeed(CH.zipRight_(CH.write(a), loop))));
    return loop;
  })));
}
//# sourceMappingURL=asyncEffect.mjs.map