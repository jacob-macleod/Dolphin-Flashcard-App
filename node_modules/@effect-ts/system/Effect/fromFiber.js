"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromFiber = fromFiber;
exports.fromFiberM = fromFiberM;

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/index.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a `Effect` value that represents the exit value of the specified
 * fiber.
 */
function fromFiber(fiber, __trace) {
  return (0, _core.chain_)((0, _core.succeedWith)(fiber), Fiber.join, __trace);
}
/**
 * Creates a `Effect` value that represents the exit value of the specified
 * fiber.
 */


function fromFiberM(fiber, __trace) {
  return (0, _core.chain_)(fiber, Fiber.join, __trace);
}
//# sourceMappingURL=fromFiber.js.map