"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHub = toHub;
exports.toHub_ = toHub_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../../../Function/index.js");

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Hub/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var RunIntoHubManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runIntoHubManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 */
function toHub_(self, capacity) {
  return M.map_(M.tap_(M.bind_(M.do, "hub", () => T.toManagedRelease_(H.makeBounded(capacity), _ => H.shutdown(_))), ({
    hub
  }) => M.fork(RunIntoHubManaged.runIntoHubManaged_(self, hub))), ({
    hub
  }) => hub);
}
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 *
 * @ets_data_first toHub_
 */


function toHub(capacity) {
  return self => toHub_(self, capacity);
}
//# sourceMappingURL=toHub.js.map