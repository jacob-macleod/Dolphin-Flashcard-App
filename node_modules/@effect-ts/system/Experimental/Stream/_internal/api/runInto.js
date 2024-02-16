"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runInto = runInto;
exports.runInto_ = runInto_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var RunIntoManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runIntoManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 */
function runInto_(self, queue) {
  return M.use_(RunIntoManaged.runIntoManaged_(self, queue), _ => T.unit);
}
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 *
 * @ets_data_first runInto_
 */


function runInto(queue) {
  return self => runInto_(self, queue);
}
//# sourceMappingURL=runInto.js.map