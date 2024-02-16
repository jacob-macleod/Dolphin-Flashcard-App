"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAll = zipAll;
exports.zipAll_ = zipAll_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _zipAllWith = /*#__PURE__*/require("./zipAllWith.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips this stream with another point-wise, creating a new stream of pairs of elements
 * from both sides.
 *
 * The defaults `defaultLeft` and `defaultRight` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 */
function zipAll_(self, that, defaultLeft, defaultRight) {
  return (0, _zipAllWith.zipAllWith_)(self, that, _ => Tp.tuple(_, defaultRight), _ => Tp.tuple(defaultLeft, _), Tp.tuple);
}
/**
 * Zips this stream with another point-wise, creating a new stream of pairs of elements
 * from both sides.
 *
 * The defaults `defaultLeft` and `defaultRight` will be used if the streams have different lengths
 * and one of the streams has ended before the other.
 *
 * @ets_data_first zipAll_
 */


function zipAll(that, defaultLeft, defaultRight) {
  return self => zipAll_(self, that, defaultLeft, defaultRight);
}
//# sourceMappingURL=zipAll.js.map