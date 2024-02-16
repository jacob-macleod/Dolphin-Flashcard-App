"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runReduceWhileEffect = runReduceWhileEffect;
exports.runReduceWhileEffect_ = runReduceWhileEffect_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var RunReduceWhileManagedEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runReduceWhileManagedEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Executes an effectful fold over the stream of values.
 * Stops the fold early when the condition is not fulfilled.
 */
function runReduceWhileEffect_(self, s, cont, f) {
  return M.use_(RunReduceWhileManagedEffect.runReduceWhileManagedEffect_(self, s, cont, f), T.succeed);
}
/**
 * Executes an effectful fold over the stream of values.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runReduceWhileEffect_
 */


function runReduceWhileEffect(s, cont, f) {
  return self => runReduceWhileEffect_(self, s, cont, f);
}
//# sourceMappingURL=runReduceWhileEffect.js.map