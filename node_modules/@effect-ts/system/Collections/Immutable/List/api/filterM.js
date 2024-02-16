"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterM = filterM;
exports.filterM_ = filterM_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var coreZip = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/zipWith.js"));

var List = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */
function filterM_(self, f) {
  return core.suspend(() => {
    let dest = core.succeed(List.empty());

    for (const a of self) {
      dest = coreZip.zipWith_(dest, f(a), (d, b) => b ? List.append_(d, a) : d);
    }

    return dest;
  });
}
/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @ets_data_first filterM_
 */


function filterM(f) {
  return self => filterM_(self, f);
}
//# sourceMappingURL=filterM.js.map