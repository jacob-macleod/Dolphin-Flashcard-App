import * as T from "../../../Effect/index.mjs";
import * as E from "../../../Either/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as H from "../../../Hub/index.mjs";
import * as M from "../../../Managed/index.mjs";
import * as MH from "../Channel/_internal/mergeHelpers.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
import * as UnwrapManaged from "./unwrapManaged.mjs";
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */

export function raceBoth_(self, that, capacity = 16) {
  const managed = M.map_(M.let_(M.let_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "hub", () => T.toManaged(H.makeBounded(capacity))), "c1", ({
    hub
  }) => CH.fromHubManaged(hub)), "c2", ({
    hub
  }) => CH.fromHubManaged(hub)), "reader", ({
    hub
  }) => CH.toHub(hub)), "writer", ({
    c1,
    c2
  }) => CH.mergeWith_(c1[">>>"](self.channel), c2[">>>"](that.channel), selfDone => MH.done(T.map_(T.done(selfDone), E.left)), thatDone => MH.done(T.map_(T.done(thatDone), E.right)))), "channel", ({
    reader,
    writer
  }) => CH.mergeWith_(reader, writer, _ => MH.await_(_ => T.done(_)), done => MH.done(T.done(done)))), ({
    channel
  }) => new C.Sink(channel));
  return UnwrapManaged.unwrapManaged(managed);
}
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 *
 * @ets_data_first orElse_
 */

export function raceBoth(that, capacity = 16) {
  return self => raceBoth_(self, that, capacity);
}
//# sourceMappingURL=raceBoth.mjs.map