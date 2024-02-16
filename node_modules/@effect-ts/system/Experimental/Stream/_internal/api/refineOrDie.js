"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refineOrDie = refineOrDie;
exports.refineOrDie_ = refineOrDie_;

var _index = /*#__PURE__*/require("../../../../Function/index.js");

var RefineOrDieWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./refineOrDieWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */
function refineOrDie_(self, pf) {
  return RefineOrDieWith.refineOrDieWith_(self, pf, _index.identity);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 *
 * @ets_data_first refineOrDie_
 */


function refineOrDie(pf) {
  return self => refineOrDie_(self, pf);
}
//# sourceMappingURL=refineOrDie.js.map