"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAllCause = catchAllCause;
exports.catchAllCause_ = catchAllCause_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var Finalizer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Managed/ReleaseMap/finalizer.js"));

var makeReleaseMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Managed/ReleaseMap/makeReleaseMap.js"));

var releaseAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Managed/ReleaseMap/releaseAll.js"));

var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
function catchAllCause_(self, f) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "finalizerRef", () => M.finalizerRef(Finalizer.noopFinalizer)), "ref", () => T.toManaged(Ref.makeRef({
    _tag: "NotStarted"
  }))), "pull", ({
    finalizerRef,
    ref
  }) => {
    const closeCurrent = cause => T.uninterruptible(T.chain_(Ref.getAndSet_(finalizerRef, Finalizer.noopFinalizer), f => f(Ex.halt(cause))));

    const open = stream => asState => T.uninterruptibleMask(({
      restore
    }) => T.chain_(makeReleaseMap.makeReleaseMap, releaseMap => T.chain_(finalizerRef.set(exit => releaseAll.releaseAll(exit, T.sequential)(releaseMap)), () => T.tap_(T.map_(T.provideSome_(restore(stream.proc.effect), _ => Tp.tuple(_, releaseMap)), ({
      tuple: [_, __]
    }) => __), pull => ref.set(asState(pull))))));

    const failover = cause => Option.fold_(C.sequenceCauseOption(cause), () => T.fail(Option.none), cause => T.flatten(T.chain_(closeCurrent(cause), () => open(f(cause))(pull => ({
      _tag: "Other",
      pull
    })))));

    return T.chain_(ref.get, s => {
      switch (s._tag) {
        case "NotStarted":
          {
            return T.catchAllCause_(T.flatten(open(self)(pull => ({
              _tag: "Self",
              pull
            }))), failover);
          }

        case "Self":
          {
            return T.catchAllCause_(s.pull, failover);
          }

        case "Other":
          {
            return s.pull;
          }
      }
    });
  }), ({
    pull
  }) => pull));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */


function catchAllCause(f) {
  return self => catchAllCause_(self, f);
}
//# sourceMappingURL=catchAllCause.js.map