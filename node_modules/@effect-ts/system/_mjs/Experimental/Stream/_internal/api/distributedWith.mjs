// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as HM from "../../../../Collections/Immutable/HashMap/index.mjs";
import * as L from "../../../../Collections/Immutable/List/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as P from "../../../../Promise/index.mjs";
import * as DistributedWithDynamic from "./distributedWithDynamic.mjs";
/**
 * More powerful version of `Stream#broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */

export function distributedWith_(self, n, maximumLag, decide) {
  return M.chain_(T.toManaged(P.make()), prom => {
    return M.chain_(DistributedWithDynamic.distributedWithDynamic_(self, maximumLag, a => T.chain_(P.await(prom), _ => _(a)), _ => T.unit), next => T.toManaged(T.chain_(T.collectAll(CK.map_(CK.range(0, n - 1), id => T.map_(next, ({
      tuple: [key, queue]
    }) => Tp.tuple(Tp.tuple(key, id), queue)))), entries => {
      const {
        tuple: [mappings, queues]
      } = CK.reduceRight_(entries, Tp.tuple(HM.make(), L.empty()), ({
        tuple: [mapping, queue]
      }, {
        tuple: [mappings, queues]
      }) => Tp.tuple(HM.set_(mappings, Tp.get_(mapping, 0), Tp.get_(mapping, 1)), L.prepend_(queues, queue)));
      return T.as_(P.succeed_(prom, a => T.map_(decide(a), f => key => f(HM.unsafeGet_(mappings, key)))), queues);
    })));
  });
}
/**
 * More powerful version of `Stream#broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 *
 * @ets_data_first distributedWith_
 */

export function distributedWith(n, maximumLag, decide) {
  return self => distributedWith_(self, n, maximumLag, decide);
}
//# sourceMappingURL=distributedWith.mjs.map