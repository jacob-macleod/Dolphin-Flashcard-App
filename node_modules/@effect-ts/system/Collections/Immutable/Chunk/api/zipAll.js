"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAll = zipAll;
exports.zipAll_ = zipAll_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Tuple/index.js"));

var _zipAllWith = /*#__PURE__*/require("./zipAllWith.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 */
function zipAll_(self, that) {
  return (0, _zipAllWith.zipAllWith_)(self, that, (a, b) => Tp.tuple(O.some(a), O.some(b)), a => Tp.tuple(O.some(a), O.none), b => Tp.tuple(O.none, O.some(b)));
}
/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 *
 * @ets_data_first zipAll_
 */


function zipAll(that) {
  return self => zipAll_(self, that);
}
//# sourceMappingURL=zipAll.js.map