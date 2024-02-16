"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.managed = managed;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a single-valued stream from a managed resource
 */
function managed(self) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "doneRef", () => Ref.makeManagedRef(false)), "finalizer", () => M.makeManagedReleaseMap(T.sequential)), "pull", ({
    doneRef,
    finalizer
  }) => T.uninterruptibleMask(({
    restore
  }) => T.chain_(doneRef.get, done => done ? Pull.end : T.mapError_(T.map_(T.tap_(T.bind_(T.do, "a", () => T.onError_(restore(T.provideSome_(T.map_(self.effect, ({
    tuple: [_, __]
  }) => __), r => Tp.tuple(r, finalizer))), () => doneRef.set(true))), () => doneRef.set(true)), ({
    a
  }) => A.single(a)), O.some)))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=managed.js.map