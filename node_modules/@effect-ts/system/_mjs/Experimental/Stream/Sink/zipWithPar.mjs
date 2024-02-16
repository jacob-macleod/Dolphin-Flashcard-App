import * as T from "../../../Effect/index.mjs";
import * as Ex from "../../../Exit/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as H from "../../../Hub/index.mjs";
import * as M from "../../../Managed/index.mjs";
import * as MH from "../Channel/_internal/mergeHelpers.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 */

export function zipWithPar_(self, that, f, capacity = 16) {
  const channel = CH.unwrapManaged(M.map_(M.let_(M.let_(M.let_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "hub", () => T.toManaged(H.makeBounded(capacity))), "left", ({
    hub
  }) => CH.fromHubManaged(hub)), "right", ({
    hub
  }) => CH.fromHubManaged(hub)), "reader", ({
    hub
  }) => CH.toHub(hub)), "c1", ({
    left
  }) => left[">>>"](self.channel)), "c2", ({
    right
  }) => right[">>>"](that.channel)), "writer", ({
    c1,
    c2
  }) => CH.mergeWith_(c1, c2, Ex.fold(err => MH.done(T.halt(err)), lz => MH.await_(Ex.fold(cause => T.halt(cause), rz => T.succeed(f(lz, rz))))), Ex.fold(err => MH.done(T.halt(err)), rz => MH.await_(Ex.fold(cause => T.halt(cause), lz => T.succeed(f(lz, rz))))))), ({
    reader,
    writer
  }) => CH.mergeWith_(reader, writer, _ => MH.await_(Ex.fold(cause => T.halt(cause), z => T.succeed(z))), Ex.fold(cause => MH.done(T.halt(cause)), z => MH.done(T.succeed(z))))));
  return new C.Sink(channel);
}
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 *
 * @ets_data_first zipWithPar_
 */

export function zipWithPar(that, f, capacity = 16) {
  return self => zipWithPar_(self, that, f, capacity);
}
//# sourceMappingURL=zipWithPar.mjs.map