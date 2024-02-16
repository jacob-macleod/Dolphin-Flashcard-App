import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as H from "../../../Hub/index.mjs";
import * as M from "../../../Managed/index.mjs";
import * as MH from "../Channel/_internal/mergeHelpers.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
import * as UnwrapManaged from "./unwrapManaged.mjs";
/**
 * Runs both sinks in parallel on the input, using the specified merge
 * function as soon as one result or the other has been computed.
 */

export function raceWith_(self, that, leftDone, rightDone, capacity = 16) {
  const managed = M.map_(M.let_(M.let_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "hub", () => T.toManaged(H.makeBounded(capacity))), "c1", ({
    hub
  }) => CH.fromHubManaged(hub)), "c2", ({
    hub
  }) => CH.fromHubManaged(hub)), "reader", ({
    hub
  }) => CH.toHub(hub)), "writer", ({
    c1,
    c2
  }) => CH.mergeWith_(c1[">>>"](self.channel), c2[">>>"](that.channel), leftDone, rightDone)), "channel", ({
    reader,
    writer
  }) => CH.mergeWith_(reader, writer, _ => MH.await_(_ => T.done(_)), done => MH.done(T.done(done)))), ({
    channel
  }) => new C.Sink(channel));
  return UnwrapManaged.unwrapManaged(managed);
}
/**
 * Runs both sinks in parallel on the input, using the specified merge
 * function as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWith_
 */

export function raceWith(that, leftDone, rightDone, capacity = 16) {
  return self => raceWith_(self, that, leftDone, rightDone, capacity);
}
//# sourceMappingURL=raceWith.mjs.map