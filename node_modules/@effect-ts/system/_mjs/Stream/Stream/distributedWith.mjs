// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Map from "../../Collections/Immutable/Map/index.mjs";
import { identity, pipe } from "../../Function/index.mjs";
import * as P from "../../Promise/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { distributedWithDynamic_ } from "./distributedWithDynamic.mjs";
/**
 * More powerful version of `broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */

export function distributedWith(n, maximumLag, decide) {
  return self => distributedWith_(self, n, maximumLag, decide);
}
/**
 * More powerful version of `broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */

export function distributedWith_(self, n, maximumLag, decide) {
  return M.chain_(M.fromEffect(P.make()), prom => M.chain_(distributedWithDynamic_(self, maximumLag, o => T.chain_(P.await(prom), _ => _(o)), _ => T.unit), next => M.fromEffect(T.chain_(A.mapEffect_(A.map_(A.range(0, n - 1), id => T.map_(next, ({
    tuple: [key, queue]
  }) => [[key, id], queue])), identity), entries => {
    const [mappings, queues] = A.reduceRight_(entries, [Map.empty, A.empty()], ([mapping, queue], [mappings, queues]) => [Map.insert(mapping[0], mapping[1])(mappings), A.concat_(A.single(queue), queues)]);
    return T.as_(P.succeed_(prom, o => // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    T.map_(decide(o), f => key => f(mappings.get(key)))), queues);
  }))));
}
//# sourceMappingURL=distributedWith.mjs.map