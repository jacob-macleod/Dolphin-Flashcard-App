"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensuringChild = ensuringChild;
exports.ensuringChild_ = ensuringChild_;
exports.ensuringChildren = ensuringChildren;
exports.ensuringChildren_ = ensuringChildren_;

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _index3 = /*#__PURE__*/require("../Supervisor/index.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var ensuring = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ensuring.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 *
 * @ets_data_first ensuringChildren_
 */
function ensuringChildren(children, __trace) {
  return fa => ensuringChildren_(fa, children, __trace);
}
/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 */


function ensuringChildren_(fa, children, __trace) {
  return core.chain_(_index3.track, s => ensuring.ensuring_(core.supervised_(fa, s), core.chain_(s.value, children), __trace));
}
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not
 * this effect succeeds.
 */


function ensuringChild_(fa, f, __trace) {
  return ensuringChildren_(fa, x => f(Fiber.collectAll(x)), __trace);
}
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not
 * this effect succeeds.
 *
 * @ets_data_first ensuringChild_
 */


function ensuringChild(f, __trace) {
  return fa => ensuringChild_(fa, f, __trace);
}
//# sourceMappingURL=ensuringChildren.js.map