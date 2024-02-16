"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tapEither = tapEither;
exports.tapEither_ = tapEither_;

var _index = /*#__PURE__*/require("../Function/index.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var _either = /*#__PURE__*/require("./either.js");

var _fromEither = /*#__PURE__*/require("./fromEither.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Either`.
 */
function tapEither_(self, f, __trace) {
  return core.chain_((0, _either.either)(self), exit => core.chain_(f(exit), () => (0, _fromEither.fromEither)(() => exit)));
}
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Either`.
 *
 * @ets_data_first tapEither_
 */


function tapEither(f, __trace) {
  return self => tapEither_(self, f, __trace);
}
//# sourceMappingURL=tapEither.js.map