"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapM = mapM;
exports.mapM_ = mapM_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/excl-forEach.js"));

var coreMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/map.js"));

var List = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Effectfully maps the elements of this list.
 */
function mapM_(self, f) {
  return core.suspend(() => {
    const builder = List.emptyPushable();
    return coreMap.map_(forEach.forEachUnit_(self, a => coreMap.map_(f(a), b => {
      List.push_(builder, b);
    })), () => builder);
  });
}
/**
 * Effectfully maps the elements of this list.
 *
 * @ets_data_first mapM_
 */


function mapM(f) {
  return self => mapM_(self, f);
}
//# sourceMappingURL=mapM.js.map