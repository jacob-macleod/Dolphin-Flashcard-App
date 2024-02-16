"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toQueueOfElements = toQueueOfElements;
exports.toQueueOfElements_ = toQueueOfElements_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var RunIntoElementsManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runIntoElementsManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Converts the stream to a managed queue of elements. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */
function toQueueOfElements_(self, capacity = 2) {
  return M.map_(M.tap_(M.bind_(M.do, "queue", () => T.toManagedRelease_(Q.makeBounded(capacity), Q.shutdown)), ({
    queue
  }) => M.fork(RunIntoElementsManaged.runIntoElementsManaged_(self, queue))), ({
    queue
  }) => queue);
}
/**
 * Converts the stream to a managed queue of elements. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 *
 * @ets_data_first toQueueOfElements_
 */


function toQueueOfElements(capacity = 2) {
  return self => toQueueOfElements_(self, capacity);
}
//# sourceMappingURL=toQueueOfElements.js.map