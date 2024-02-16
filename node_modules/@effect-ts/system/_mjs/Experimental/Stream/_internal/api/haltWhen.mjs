import * as T from "../../../../Effect/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
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
  const writer = fiber => CH.unwrap(T.map_(fiber.poll, O.fold(() => CH.readWith(in_ => CH.zipRight_(CH.write(in_), writer(fiber)), err => CH.fail(err), _ => CH.unit), exit => Ex.fold_(exit, _ => CH.failCause(_), _ => CH.unit))));

  return new C.Stream(CH.unwrapManaged(M.map_(T.forkManaged(io), fiber => self.channel[">>>"](writer(fiber)))));
}
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 *
 * @ets_data_first haltWhen_
 */

export function haltWhen(io) {
  return self => haltWhen_(self, io);
}
//# sourceMappingURL=haltWhen.mjs.map