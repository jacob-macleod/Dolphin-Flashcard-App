"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.in = _in;
exports.in_ = in_;

var _index = /*#__PURE__*/require("../Collections/Immutable/Array/index.js");

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var _coreScope = /*#__PURE__*/require("./core-scope.js");

var interruption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruption.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new effect whose scope will be extended by the specified scope.
 * This means any finalizers associated with the effect will not be executed
 * until the specified scope is closed.
 *
 * @ets_data_first in_
 */
function _in(scope, __trace) {
  return self => in_(self, scope, __trace);
}
/**
 * Returns a new effect whose scope will be extended by the specified scope.
 * This means any finalizers associated with the effect will not be executed
 * until the specified scope is closed.
 */


function in_(self, scope, __trace) {
  return interruption.uninterruptibleMask(({
    restore
  }) => core.chain_((0, _coreScope.forkDaemon)(restore(self), __trace), fiber => core.chain_(scope.extend(fiber.scope), () => interruption.onInterrupt_(restore(Fiber.join(fiber)), x => O.fold_((0, _index.head)(Array.from(x)), () => Fiber.interrupt(fiber), id => fiber.interruptAs(id))))));
}
//# sourceMappingURL=in.js.map