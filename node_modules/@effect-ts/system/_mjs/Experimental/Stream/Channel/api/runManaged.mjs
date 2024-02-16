// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import { identity } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Executor from "../_internal/executor.mjs";

function runManagedInterpret(channelState, exec) {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    switch (channelState._typeId) {
      case Executor.ChannelStateEffectTypeId:
        {
          return T.chain_(channelState.effect, () => runManagedInterpret(exec.run(), exec));
        }

      case Executor.ChannelStateEmitTypeId:
        {
          channelState = exec.run();
          break;
        }

      case Executor.ChannelStateDoneTypeId:
        {
          return T.done(exec.getDone());
        }
    }
  }

  throw new Error("Bug");
}
/**
 * Runs a channel until the end is received
 */


export function runManaged(self) {
  return M.mapM_(M.makeExit_(T.succeedWith(() => new Executor.ChannelExecutor(() => self, undefined, identity)), (exec, exit) => exec.close(exit) || T.unit), exec => T.suspend(() => runManagedInterpret(exec.run(), exec)));
}
//# sourceMappingURL=runManaged.mjs.map