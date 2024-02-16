"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupBy = void 0;
exports.filter = filter;
exports.filter_ = filter_;
exports.first = first;
exports.first_ = first_;
exports.make = make;
exports.make_ = make_;
exports.mergeGroupBy = mergeGroupBy;
exports.mergeGroupBy_ = mergeGroupBy_;

var Mp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Map/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Exit/index.js"));

var _index5 = /*#__PURE__*/require("../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Queue/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Ref/index.js"));

var ChainPar = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/chainPar.js"));

var DistributedWithDynamic = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/distributedWithDynamic.js"));

var FilterEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/filterEffect.js"));

var FlattenExitOption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/flattenExitOption.js"));

var FromQueueWithShutdown = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/fromQueueWithShutdown.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/map.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/mapEffect.js"));

var UnwrapManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/unwrapManaged.js"));

var ZipWithIndex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/api/zipWithIndex.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class GroupBy {}

exports.GroupBy = GroupBy;

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

function make_(stream, key, buffer) {
  return new GroupByInternal(stream, key, buffer);
}
/**
 * @ets_data_first make_
 */


function make(key, buffer) {
  return stream => make_(stream, key, buffer);
}
/**
 * Only consider the first n groups found in the stream.
 */


function filter_(self, f) {
  concrete(self);
  return self.filter(f);
}
/**
 * Only consider the first n groups found in the stream.
 *
 * @ets_data_first filter_
 */


function filter(f) {
  return self => filter_(self, f);
}
/**
 * Only consider the first n groups found in the stream.
 */


function first_(self, n) {
  concrete(self);
  return self.first(n);
}
/**
 * Only consider the first n groups found in the stream.
 *
 * @ets_data_first first_
 */


function first(n) {
  return self => first_(self, n);
}

function mergeGroupBy_(self, f) {
  concrete(self);
  return self.apply(f);
}
/**
 * @ets_data_first mergeGroupBy_
 */


function mergeGroupBy(f) {
  return self => mergeGroupBy_(self, f);
}
//# sourceMappingURL=GroupBy.js.map