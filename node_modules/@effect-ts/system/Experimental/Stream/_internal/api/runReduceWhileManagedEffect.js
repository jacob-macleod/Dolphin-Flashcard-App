"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runReduceWhileManagedEffect = runReduceWhileManagedEffect;
exports.runReduceWhileManagedEffect_ = runReduceWhileManagedEffect_;

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Sink/index.js"));

var RunManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */
function runReduceWhileManagedEffect_(self, s, cont, f) {
  return RunManaged.runManaged_(self, SK.reduceEffect(s, cont, f));
}
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */


function runReduceWhileManagedEffect(s, cont, f) {
  return self => runReduceWhileManagedEffect_(self, s, cont, f);
}
//# sourceMappingURL=runReduceWhileManagedEffect.js.map