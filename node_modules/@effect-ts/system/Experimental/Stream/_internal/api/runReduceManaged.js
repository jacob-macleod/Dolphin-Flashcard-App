"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runReduceManaged = runReduceManaged;
exports.runReduceManaged_ = runReduceManaged_;

var RunReduceWhileManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runReduceWhileManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */
function runReduceManaged_(self, s, f) {
  return RunReduceWhileManaged.runReduceWhileManaged_(self, s, _ => true, (s, a) => f(s, a));
}
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 *
 * @ets_data_first runReduceManaged_
 */


function runReduceManaged(s, f) {
  return self => runReduceManaged_(self, s, f);
}
//# sourceMappingURL=runReduceManaged.js.map