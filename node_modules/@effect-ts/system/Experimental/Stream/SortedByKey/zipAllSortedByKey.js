"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAllSortedByKey = zipAllSortedByKey;
exports.zipAllSortedByKey_ = zipAllSortedByKey_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var ZipAllSortedByKeyWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipAllSortedByKeyWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Combines values associated with each key into a
 * tuple, using the specified values `defaultLeft` and `defaultRight` to
 * fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 */
function zipAllSortedByKey_(self, that, defaultLeft, defaultRight, ord) {
  return ZipAllSortedByKeyWith.zipAllSortedByKeyWith_(self, that, _ => Tp.tuple(_, defaultRight), _ => Tp.tuple(defaultLeft, _), (a, b) => Tp.tuple(a, b), ord);
}
/**
 * Zips this stream that is sorted by distinct keys and the specified
 * stream that is sorted by distinct keys to produce a new stream that is
 * sorted by distinct keys. Combines values associated with each key into a
 * tuple, using the specified values `defaultLeft` and `defaultRight` to
 * fill in missing values.
 *
 * This allows zipping potentially unbounded streams of data by key in
 * constant space but the caller is responsible for ensuring that the
 * streams are sorted by distinct keys.
 *
 * @ets_data_first zipAllSortedByKey_
 */


function zipAllSortedByKey(that, defaultLeft, defaultRight, ord) {
  return self => zipAllSortedByKey_(self, that, defaultLeft, defaultRight, ord);
}
//# sourceMappingURL=zipAllSortedByKey.js.map