"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.managedOut = managedOut;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var ReleaseMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/ReleaseMap/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var MapOut = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapOut.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Use a managed to emit an output element
 */
function managedOut(self) {
  return MapOut.mapOut_(C.acquireReleaseOutExitWith_(T.chain_(ReleaseMap.makeReleaseMap, releaseMap => T.map_(T.provideSome_(self.effect, _ => Tp.tuple(_, releaseMap)), ({
    tuple: [_, out]
  }) => Tp.tuple(out, releaseMap))), ({
    tuple: [_, releaseMap]
  }, exit) => ReleaseMap.releaseAll(exit, T.sequential)(releaseMap)), Tp.get(0));
}
//# sourceMappingURL=managedOut.js.map