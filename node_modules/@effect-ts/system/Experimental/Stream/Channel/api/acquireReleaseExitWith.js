"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acquireReleaseExitWith = acquireReleaseExitWith;
exports.acquireReleaseExitWith_ = acquireReleaseExitWith_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../../../Function/index.js");

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Ref/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function acquireReleaseExitWith_(acquire, use, release) {
  return C.chain_(C.fromEffect(Ref.makeRef(_ => T.unit)), ref => C.ensuringWith_(C.chain_(C.fromEffect(T.uninterruptible(T.tap_(acquire, a => ref.set(_ => release(a, _))))), use), ex => T.chain_(ref.get, _ => _(ex))));
}
/**
 * @ets_data_first acquireReleaseExitWith_
 */


function acquireReleaseExitWith(use, release) {
  return acquire => acquireReleaseExitWith_(acquire, use, release);
}
//# sourceMappingURL=acquireReleaseExitWith.js.map