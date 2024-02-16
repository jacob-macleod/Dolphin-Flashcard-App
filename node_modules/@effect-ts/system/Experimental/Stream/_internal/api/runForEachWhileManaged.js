"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runForEachWhileManaged = runForEachWhileManaged;
exports.runForEachWhileManaged_ = runForEachWhileManaged_;

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Sink/index.js"));

var RunManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
function runForEachWhileManaged_(self, f) {
  return RunManaged.runManaged_(self, SK.forEachWhile(f));
}
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 *
 * @ets_data_first runForEachWhileManaged_
 */


function runForEachWhileManaged(f) {
  return self => runForEachWhileManaged_(self, f);
}
//# sourceMappingURL=runForEachWhileManaged.js.map