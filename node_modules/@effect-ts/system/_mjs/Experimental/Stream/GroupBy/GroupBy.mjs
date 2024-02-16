// ets_tracing: off
import * as Mp from "../../../Collections/Immutable/Map/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import * as Ex from "../../../Exit/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as M from "../../../Managed/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as P from "../../../Promise/index.mjs";
import * as Q from "../../../Queue/index.mjs";
import * as Ref from "../../../Ref/index.mjs";
import * as ChainPar from "../_internal/api/chainPar.mjs";
import * as DistributedWithDynamic from "../_internal/api/distributedWithDynamic.mjs";
import * as FilterEffect from "../_internal/api/filterEffect.mjs";
import * as FlattenExitOption from "../_internal/api/flattenExitOption.mjs";
import * as FromQueueWithShutdown from "../_internal/api/fromQueueWithShutdown.mjs";
import * as Map from "../_internal/api/map.mjs";
import * as MapEffect from "../_internal/api/mapEffect.mjs";
import * as UnwrapManaged from "../_internal/api/unwrapManaged.mjs";
import * as ZipWithIndex from "../_internal/api/zipWithIndex.mjs";
export class GroupBy {}

class GroupByInternal extends GroupBy {
  constructor(stream, key, buffer) {
    super();
    this.stream = stream;
    this.key = key;
    this.buffer = buffer;
    this.grouped = UnwrapManaged.unwrapManaged(M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "decider", () => T.toManaged(P.make())), "out", () => T.toManagedRelease_(Q.makeBounded(this.buffer), Q.shutdown)), "ref", () => T.toManaged(Ref.makeRef(Mp.empty))), "add", ({
      decider,
      out
    }) => DistributedWithDynamic.distributedWithDynamic_(MapEffect.mapEffect_(this.stream, this.key), this.buffer, ({
      tuple: [k, v]
    }) => T.chain_(P.await(decider), _ => _(k, v)), _ => Q.offer_(out, _))), ({
      add,
      decider,
      out,
      ref
    }) => T.toManaged(P.succeed_(decider, (k, _) => T.chain_(T.map_(ref.get, Mp.lookup(k)), O.fold(() => T.chain_(add, ({
      tuple: [idx, q]
    }) => T.as_(T.zipRight_(Ref.update_(ref, Mp.insert(k, idx)), Q.offer_(out, Ex.succeed(Tp.tuple(k, Q.map_(q, Ex.map(({
      tuple: [_, a]
    }) => a)))))), _ => _ === idx)), idx => T.succeed(_ => _ === idx)))))), ({
      out
    }) => FlattenExitOption.flattenExitOption(FromQueueWithShutdown.fromQueueWithShutdown_(out))));
  }
  /**
   * Only consider the first n groups found in the stream.
   */


  first(n) {
    return new FirstInternal(this.stream, this.key, this.buffer, n);
  }
  /**
   * Only consider the first n groups found in the stream.
   */


  filter(f) {
    return new FilterInternal(this.stream, this.key, this.buffer, f);
  }

  apply(f) {
    return ChainPar.chainPar_(this.grouped, Number.MAX_SAFE_INTEGER, ({
      tuple: [k, q]
    }) => f(k, FlattenExitOption.flattenExitOption(FromQueueWithShutdown.fromQueueWithShutdown_(q))));
  }

}

class FirstInternal extends GroupByInternal {
  constructor(stream, key, buffer, n) {
    super(stream, key, buffer);
    this.n = n;
    this.grouped = Map.map_(FilterEffect.filterEffect_(ZipWithIndex.zipWithIndex(super.grouped), elem => {
      const {
        tuple: [{
          tuple: [_, q]
        }, i]
      } = elem;
      return i < this.n ? T.as_(T.succeed(elem), true) : T.as_(Q.shutdown(q), false);
    }), Tp.get(0));
  }

}

class FilterInternal extends GroupByInternal {
  constructor(stream, key, buffer, f) {
    super(stream, key, buffer);
    this.f = f;
    this.grouped = FilterEffect.filterEffect_(super.grouped, elem => {
      const {
        tuple: [k, q]
      } = elem;
      return this.f(k) ? T.as_(T.succeed(elem), true) : T.as_(Q.shutdown(q), false);
    });
  }

}

function concrete(_groupBy) {//
}

export function make_(stream, key, buffer) {
  return new GroupByInternal(stream, key, buffer);
}
/**
 * @ets_data_first make_
 */

export function make(key, buffer) {
  return stream => make_(stream, key, buffer);
}
/**
 * Only consider the first n groups found in the stream.
 */

export function filter_(self, f) {
  concrete(self);
  return self.filter(f);
}
/**
 * Only consider the first n groups found in the stream.
 *
 * @ets_data_first filter_
 */

export function filter(f) {
  return self => filter_(self, f);
}
/**
 * Only consider the first n groups found in the stream.
 */

export function first_(self, n) {
  concrete(self);
  return self.first(n);
}
/**
 * Only consider the first n groups found in the stream.
 *
 * @ets_data_first first_
 */

export function first(n) {
  return self => first_(self, n);
}
export function mergeGroupBy_(self, f) {
  concrete(self);
  return self.apply(f);
}
/**
 * @ets_data_first mergeGroupBy_
 */

export function mergeGroupBy(f) {
  return self => mergeGroupBy_(self, f);
}
//# sourceMappingURL=GroupBy.mjs.map