"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElseEither = orElseEither;
exports.orElseEither_ = orElseEither_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var _map = /*#__PURE__*/require("./map.js");

var _orElse = /*#__PURE__*/require("./orElse.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
function orElseEither_(self, that) {
  return (0, _orElse.orElse)((0, _map.map_)(that, E.right))((0, _map.map_)(self, E.left));
}
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */


function orElseEither(that) {
  return self => orElseEither_(self, that);
}
//# sourceMappingURL=orElseEither.js.map