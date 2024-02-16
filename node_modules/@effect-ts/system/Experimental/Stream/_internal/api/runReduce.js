"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runReduce = runReduce;
exports.runReduce_ = runReduce_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var RunReduceWhileManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runReduceWhileManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 */
function runReduce_(self, s, f) {
  return M.use_(RunReduceWhileManaged.runReduceWhileManaged_(self, s, _ => true, (s, a) => f(s, a)), T.succeed);
}
/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 *
 * @ets_data_first runReduce_
 */


function runReduce(s, f) {
  return self => runReduce_(self, s, f);
}
//# sourceMappingURL=runReduce.js.map