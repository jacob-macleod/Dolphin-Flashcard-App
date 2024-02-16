"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runIntoManaged = runIntoManaged;
exports.runIntoManaged_ = runIntoManaged_;

var _index = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var TK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Take/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
function runIntoManaged_(self, queue) {
  const writer = CH.readWithCause(in_ => CH.zipRight_(CH.write(TK.chunk(in_)), writer), cause => CH.write(TK.halt(cause)), _ => CH.write(TK.end));
  return M.asUnit(CH.runManaged(CH.drain(CH.mapOutEffect_(self.channel[">>>"](writer), _ => Q.offer_(queue, _)))));
}
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 *
 * @ets_data_first runIntoManaged_
 */


function runIntoManaged(queue) {
  return self => runIntoManaged_(self, queue);
}
//# sourceMappingURL=runIntoManaged.js.map