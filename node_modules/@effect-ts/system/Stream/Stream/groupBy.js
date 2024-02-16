"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBy = groupBy;
exports.groupBy_ = groupBy_;

var MP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Map/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var GB = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../GroupBy/index.js"));

var _distributedWithDynamic = /*#__PURE__*/require("./distributedWithDynamic.js");

var _flattenExitOption = /*#__PURE__*/require("./flattenExitOption.js");

var _fromQueueWithShutdown = /*#__PURE__*/require("./fromQueueWithShutdown.js");

var _mapM = /*#__PURE__*/require("./mapM.js");

var _unwrapManaged = /*#__PURE__*/require("./unwrapManaged.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * More powerful version of `Stream.groupByKey`
 */
function groupBy_(self, f, buffer = 16) {
  const qstream = (0, _unwrapManaged.unwrapManaged)(M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "decider", () => T.toManaged(P.make())), "out", () => T.toManagedRelease_(Q.makeBounded(buffer), Q.shutdown)), "ref", () => T.toManaged(Ref.makeRef(MP.empty))), "add", ({
    decider,
    out
  }) => (0, _distributedWithDynamic.distributedWithDynamic)(buffer, kv => T.chain_(P.await(decider), _ => _(...kv.tuple)), x => Q.offer_(out, x))((0, _mapM.mapM_)(self, f))), ({
    add,
    decider,
    out,
    ref
  }) => T.toManaged(P.succeed_(decider, (k, _) => T.chain_(T.map_(ref.get, MP.lookup(k)), O.fold(() => T.chain_(add, ({
    tuple: [idx, q]
  }) => T.as_(T.zipRight_(Ref.update_(ref, MP.insert(k, idx)), Q.offer_(out, Ex.succeed(Tp.tuple(k, Q.map_(q, ex => Ex.map_(ex, _ => _.get(1))))))), _ => _ === idx)), idx => T.succeed(_ => _ === idx)))))), ({
    out
  }) => (0, _flattenExitOption.flattenExitOption)((0, _fromQueueWithShutdown.fromQueueWithShutdown)(out))));
  return new GB.GroupBy(qstream, buffer);
}
/**
 * More powerful version of `Stream.groupByKey`
 */


function groupBy(f, buffer = 16) {
  return self => groupBy_(self, f, buffer);
}
//# sourceMappingURL=groupBy.js.map