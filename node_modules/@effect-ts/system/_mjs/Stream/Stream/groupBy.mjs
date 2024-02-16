// ets_tracing: off
import * as MP from "../../Collections/Immutable/Map/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as P from "../../Promise/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as GB from "../GroupBy/index.mjs";
import { distributedWithDynamic } from "./distributedWithDynamic.mjs";
import { flattenExitOption } from "./flattenExitOption.mjs";
import { fromQueueWithShutdown } from "./fromQueueWithShutdown.mjs";
import { mapM_ } from "./mapM.mjs";
import { unwrapManaged } from "./unwrapManaged.mjs";
/**
 * More powerful version of `Stream.groupByKey`
 */

export function groupBy_(self, f, buffer = 16) {
  const qstream = unwrapManaged(M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "decider", () => T.toManaged(P.make())), "out", () => T.toManagedRelease_(Q.makeBounded(buffer), Q.shutdown)), "ref", () => T.toManaged(Ref.makeRef(MP.empty))), "add", ({
    decider,
    out
  }) => distributedWithDynamic(buffer, kv => T.chain_(P.await(decider), _ => _(...kv.tuple)), x => Q.offer_(out, x))(mapM_(self, f))), ({
    add,
    decider,
    out,
    ref
  }) => T.toManaged(P.succeed_(decider, (k, _) => T.chain_(T.map_(ref.get, MP.lookup(k)), O.fold(() => T.chain_(add, ({
    tuple: [idx, q]
  }) => T.as_(T.zipRight_(Ref.update_(ref, MP.insert(k, idx)), Q.offer_(out, Ex.succeed(Tp.tuple(k, Q.map_(q, ex => Ex.map_(ex, _ => _.get(1))))))), _ => _ === idx)), idx => T.succeed(_ => _ === idx)))))), ({
    out
  }) => flattenExitOption(fromQueueWithShutdown(out))));
  return new GB.GroupBy(qstream, buffer);
}
/**
 * More powerful version of `Stream.groupByKey`
 */

export function groupBy(f, buffer = 16) {
  return self => groupBy_(self, f, buffer);
}
//# sourceMappingURL=groupBy.mjs.map