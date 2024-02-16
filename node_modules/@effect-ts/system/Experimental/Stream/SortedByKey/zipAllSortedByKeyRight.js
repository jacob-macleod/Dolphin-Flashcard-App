"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllSortedByKeyRight = zipAllSortedByKeyRight;
exports.zipAllSortedByKeyRight_ = zipAllSortedByKeyRight_;

var _index = /*#__PURE__*/require("../../../Function/index.js");

var ZipAllSortedByKeyWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipAllSortedByKeyWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Keeps only values from that stream, using the
 * specified value `default` to fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */
function zipAllSortedByKeyRight_(self, that, default_, ord) {
  return ZipAllSortedByKeyWith.zipAllSortedByKeyWith_(self, that, _ => default_, _index.identity, (_, b) => b, ord);
}
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Keeps only values from that stream, using the
 * specified value `default` to fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKeyRight_
 */


function zipAllSortedByKeyRight(that, default_, ord) {
  return self => zipAllSortedByKeyRight_(self, that, default_, ord);
}
//# sourceMappingURL=zipAllSortedByKeyRight.js.map