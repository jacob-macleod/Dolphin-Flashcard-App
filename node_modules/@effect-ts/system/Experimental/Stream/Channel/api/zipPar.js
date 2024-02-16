"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipPar = zipPar;
exports.zipPar_ = zipPar_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var MH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/mergeHelpers.js"));

var MergeWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mergeWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function zipPar_(self, that) {
  return MergeWith.mergeWith_(self, that, exit1 => MH.await_(exit2 => T.done(Ex.zip_(exit1, exit2))), exit2 => MH.await_(exit1 => T.done(Ex.zip_(exit1, exit2))));
}
/**
 * @ets_data_first zipPar_
 */


function zipPar(that) {
  return self => zipPar_(self, that);
}
//# sourceMappingURL=zipPar.js.map