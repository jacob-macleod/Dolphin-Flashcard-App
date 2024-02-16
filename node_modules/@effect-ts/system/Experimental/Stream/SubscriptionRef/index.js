"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionRef = void 0;
exports.make = make;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../../Function/index.js");

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Hub/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Managed/index.js"));

var RefM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../RefM/index.js"));

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A `SubscriptionRef<A>` contains a `RefM` with a value of type
 * `A` and a `Stream` that can be subscribed to in order to receive the
 * current value as well as all changes to the value.
 */
class SubscriptionRef {
  constructor(ref, changes) {
    this.ref = ref;
    this.changes = changes;
  }

}
/**
 * Creates a new `SubscriptionRef` with the specified value.
 */


exports.SubscriptionRef = SubscriptionRef;

function make(a) {
  return T.map_(T.let_(T.bind_(T.bind_(T.do, "ref", () => RefM.makeRefM(a)), "hub", () => H.makeUnbounded()), "changes", ({
    hub,
    ref
  }) => S.unwrapManaged(M.managedApply(T.uninterruptible(RefM.modify_(ref, a => T.zipWith_(T.succeed(a), H.subscribe(hub).effect, (a, {
    tuple: [finalizer, queue]
  }) => Tp.tuple(Tp.tuple(finalizer, S.concat_(S.fromChunk(A.single(a)), S.fromQueue()(queue))), a))))))), ({
    changes,
    hub,
    ref
  }) => new SubscriptionRef(RefM.tapInput_(ref, _ => H.publish_(hub, _)), changes));
}
//# sourceMappingURL=index.js.map