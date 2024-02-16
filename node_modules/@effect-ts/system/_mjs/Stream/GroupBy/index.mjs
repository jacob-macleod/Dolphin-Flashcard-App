// ets_tracing: off
import "../../Operator/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import { chainPar } from "../Stream/chainPar.mjs";
import { filterM } from "../Stream/filterM.mjs";
import { flattenExitOption } from "../Stream/flattenExitOption.mjs";
import { fromQueueWithShutdown } from "../Stream/fromQueueWithShutdown.mjs";
import { map } from "../Stream/map.mjs";
import { zipWithIndex } from "../Stream/zipWithIndex.mjs";
/**
 * Representation of a grouped stream.
 * This allows to filter which groups will be processed.
 * Once merge is used all groups will be processed in parallel and the results will
 * be merged in arbitrary order.
 */

export class GroupBy {
  constructor(grouped, buffer) {
    this.grouped = grouped;
    this.buffer = buffer;
    this.merge = this.merge.bind(this);
  }

  merge(f) {
    return chainPar(Number.MAX_SAFE_INTEGER, this.buffer)(({
      tuple: [k, q]
    }) => f(k, flattenExitOption(fromQueueWithShutdown(q))))(this.grouped);
  }

}
/**
 * Only consider the first n groups found in the stream.
 */

export function first_(self, n) {
  const g1 = map(_ => _.get(0))(filterM(elem => {
    const {
      tuple: [{
        tuple: [, q]
      }, i]
    } = elem;

    if (i < n) {
      return T.as_(T.succeed(elem), true);
    } else {
      return T.as_(Q.shutdown(q), false);
    }
  })(zipWithIndex(self.grouped)));
  return new GroupBy(g1, self.buffer);
}
/**
 * Only consider the first n groups found in the stream.
 */

export function first(n) {
  return self => first_(self, n);
}
/**
 * Filter the groups to be processed.
 */

export function filter_(self, f) {
  const g1 = filterM(elem => {
    const {
      tuple: [k, q]
    } = elem;

    if (f(k)) {
      return T.as_(T.succeed(elem), true);
    } else {
      return T.as_(Q.shutdown(q), false);
    }
  })(self.grouped);
  return new GroupBy(g1, self.buffer);
}
/**
 * Filter the groups to be processed.
 */

export function filter(f) {
  return self => filter_(self, f);
}
//# sourceMappingURL=index.mjs.map