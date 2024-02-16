// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { collectLeft } from "./collectLeft.mjs";
import { collectRight } from "./collectRight.mjs";
import { distributedWith } from "./distributedWith.mjs";
import { flattenExitOption } from "./flattenExitOption.mjs";
import { fromQueueWithShutdown } from "./fromQueueWithShutdown.mjs";
import { mapM } from "./mapM.mjs";
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */

export function partitionEither_(self, p, buffer = 16) {
  return M.chain_(distributedWith(2, buffer, E.fold(() => T.succeed(_ => _ === 0), () => T.succeed(_ => _ === 1)))(mapM(p)(self)), queues => {
    const [q1, q2] = queues;

    if (q1 && q2) {
      return M.succeed(Tp.tuple(collectLeft(flattenExitOption(fromQueueWithShutdown(q1))), collectRight(flattenExitOption(fromQueueWithShutdown(q2)))));
    } else {
      return M.dieMessage(`partitionEither: expected two streams but got ${A.size(queues)}`);
    }
  });
}
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */

export function partitionEither(p, buffer = 16) {
  return self => partitionEither_(self, p, buffer);
}
//# sourceMappingURL=partitionEither.mjs.map