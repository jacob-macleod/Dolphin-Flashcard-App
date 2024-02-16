// ets_tracing: off
import * as L from "../../../../Collections/Immutable/List/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as CollectLeft from "./collectLeft.mjs";
import * as CollectRight from "./collectRight.mjs";
import * as DistributedWith from "./distributedWith.mjs";
import * as FlattenExitOption from "./flattenExitOption.mjs";
import * as FromQueueWithShutdown from "./fromQueueWithShutdown.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 */

export function partitionEither_(self, p, buffer = 16) {
  return M.chain_(DistributedWith.distributedWith_(MapEffect.mapEffect_(self, p), 2, buffer, E.fold(_ => T.succeed(_ => _ === 0), _ => T.succeed(_ => _ === 1))), dequeues => {
    if (L.size(dequeues) === 2) {
      return M.succeed(Tp.tuple(CollectLeft.collectLeft(FlattenExitOption.flattenExitOption(FromQueueWithShutdown.fromQueueWithShutdown_(L.unsafeFirst(dequeues)))), CollectRight.collectRight(FlattenExitOption.flattenExitOption(FromQueueWithShutdown.fromQueueWithShutdown_(L.unsafeLast(dequeues))))));
    }

    return M.dieMessage(`partitionEither: expected two streams but got ${L.size(dequeues)}`);
  });
}
/**
 * Split a stream by a predicate. The faster stream may advance by up to buffer elements further than the slower one.
 *
 * @ets_data_first partitionEither_
 */

export function partitionEither(p, buffer = 16) {
  return self => partitionEither_(self, p, buffer);
}
//# sourceMappingURL=partitionEither.mjs.map