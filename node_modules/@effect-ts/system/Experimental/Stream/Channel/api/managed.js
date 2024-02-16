"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.managed = managed;
exports.managed_ = managed_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var RM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/ReleaseMap/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var AcquireReleaseExitWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./acquireReleaseExitWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function managed_(m, use) {
  return AcquireReleaseExitWith.acquireReleaseExitWith_(RM.makeReleaseMap, releaseMap => {
    return C.chain_(C.fromEffect(T.map_(T.provideSome_(m.effect, _ => Tp.tuple(_, releaseMap)), Tp.get(1))), use);
  }, (releaseMap, exit) => RM.releaseAll(exit, T.sequential)(releaseMap));
}
/**
 * @ets_data_first managed_
 */


function managed(use) {
  return m => managed_(m, use);
}
//# sourceMappingURL=managed.js.map