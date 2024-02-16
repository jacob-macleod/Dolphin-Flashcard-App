"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllSortedByKeyWith = zipAllSortedByKeyWith;
exports.zipAllSortedByKeyWith_ = zipAllSortedByKeyWith_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var ZipAllSortedByKeyWithExec = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipAllSortedByKeyWithExec.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Uses the functions `left`, `right`, and `both`
 * to handle the cases where a key and value exist in this stream, that
 * stream, or both streams.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */
function zipAllSortedByKeyWith_(self, that, left, right, both, ord) {
  return ZipAllSortedByKeyWithExec.zipAllSortedByKeyWithExec_(self, that, left, right, both, ord, T.parallel);
}
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Uses the functions `left`, `right`, and `both`
 * to handle the cases where a key and value exist in this stream, that
 * stream, or both streams.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKeyWith_
 */


function zipAllSortedByKeyWith(that, left, right, both, ord) {
  return self => zipAllSortedByKeyWith_(self, that, left, right, both, ord);
}
//# sourceMappingURL=zipAllSortedByKeyWith.js.map