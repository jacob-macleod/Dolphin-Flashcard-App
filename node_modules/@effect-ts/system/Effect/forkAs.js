"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forkAs = forkAs;
exports.forkAs_ = forkAs_;

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/index.js"));

var FR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../FiberRef/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _interruption = /*#__PURE__*/require("./interruption.js");

var zips = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zips.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Forks the effect into a new independent fiber, with the specified name.
 *
 * @ets_data_first forkAs_
 */
function forkAs(name, __trace) {
  return self => forkAs_(self, name, __trace);
}
/**
 * Forks the effect into a new independent fiber, with the specified name.
 */


function forkAs_(self, name, __trace) {
  return (0, _interruption.uninterruptibleMask)(({
    restore
  }) => (0, _core.fork)(zips.zipRight_(FR.set_(Fiber.fiberName, O.some(name)), restore(self)), __trace));
}
//# sourceMappingURL=forkAs.js.map