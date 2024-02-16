"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runReduceManagedEffect = runReduceManagedEffect;
exports.runReduceManagedEffect_ = runReduceManagedEffect_;

var RunReduceWhileManagedEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runReduceWhileManagedEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */
function runReduceManagedEffect_(self, s, f) {
  return RunReduceWhileManagedEffect.runReduceWhileManagedEffect_(self, s, _ => true, f);
}
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 *
 * @ets_data_first runReduceManagedEffect_
 */


function runReduceManagedEffect(s, f) {
  return self => runReduceManagedEffect_(self, s, f);
}
//# sourceMappingURL=runReduceManagedEffect.js.map