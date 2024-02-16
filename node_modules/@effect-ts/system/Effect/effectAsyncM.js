"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectAsyncM = effectAsyncM;

var _index = /*#__PURE__*/require("../Function/index.js");

var catchAllCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAllCause.js"));

var _core = /*#__PURE__*/require("./core.js");

var Do = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./do.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./excl-forEach-promise.js"));

var _interruption = /*#__PURE__*/require("./interruption.js");

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var _runtime = /*#__PURE__*/require("./runtime.js");

var to = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./to.js"));

var zips = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zips.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Imports an asynchronous effect into a pure `Effect` value. This formulation is
 * necessary when the effect is itself expressed in terms of `Effect`.
 */
function effectAsyncM(register, __trace) {
  return map.map_(Do.bind_(Do.bind_(Do.bind_(Do.do, "p", () => P.make()), "r", () => (0, _runtime.runtime)()), "a", ({
    p,
    r
  }) => (0, _interruption.uninterruptibleMask)(({
    restore
  }) => zips.zipRight_((0, _core.fork)(restore(catchAllCause.catchAllCause_(register(k => {
    r.run(to.to_(k, p));
  }), c => P.halt(c)(p))), __trace), restore(P.await(p))))), ({
    a
  }) => a);
}
//# sourceMappingURL=effectAsyncM.js.map