"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grouped = grouped;
exports.grouped_ = grouped_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./forEach.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Groups elements in chunks of up to n elements
 */
function grouped_(self, n) {
  let gr = core.empty();
  let current = core.empty();
  forEach.forEach_(self, a => {
    current = core.append_(current, a);

    if (core.size(current) >= n) {
      gr = core.append_(gr, current);
      current = core.empty();
    }
  });

  if (core.size(current) > 0) {
    gr = core.append_(gr, current);
  }

  return gr;
}
/**
 * Groups elements in chunks of up to n elements
 *
 * @ets_data_first grouped_
 */


function grouped(n) {
  return self => grouped_(self, n);
}
//# sourceMappingURL=grouped.js.map