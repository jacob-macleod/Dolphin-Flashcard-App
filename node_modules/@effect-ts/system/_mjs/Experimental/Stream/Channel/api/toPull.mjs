// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import { identity } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Executor from "../_internal/executor.mjs";

function toPullInterpret(channelState, exec) {
  switch (channelState._typeId) {
    case Executor.ChannelStateEffectTypeId:
      {
        return T.chain_(channelState.effect, () => toPullInterpret(exec.run(), exec));
      }

    case Executor.ChannelStateEmitTypeId:
      {
        return T.succeed(E.right(exec.getEmit()));
      }

    case Executor.ChannelStateDoneTypeId:
      {
        const done = exec.getDone();

        if (done._tag === "Success") {
          return T.succeed(E.left(done.value));
        } else {
          return T.halt(done.cause);
        }
      }
  }
}
/**
 * Interpret a channel to a managed Pull
 */


export function toPull(self) {
  return M.map_(M.makeExit_(T.succeedWith(() => new Executor.ChannelExecutor(() => self, undefined, identity)), (exec, exit) => exec.close(exit) || T.unit), exec => T.suspend(() => toPullInterpret(exec.run(), exec)));
}
//# sourceMappingURL=toPull.mjs.map