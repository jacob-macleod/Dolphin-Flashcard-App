"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryCatchOption = tryCatchOption;
exports.tryCatchOption_ = tryCatchOption_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _fromEither = /*#__PURE__*/require("./fromEither.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Get the A from an option
 */
function tryCatchOption_(ma, onNone) {
  return (0, _fromEither.fromEither)(() => E.fromOption_(ma, onNone));
}
/**
 * Get the A from an option
 *
 * @ets_data_first tryCatchOption_
 */


function tryCatchOption(onNone) {
  return ma => tryCatchOption_(ma, onNone);
}
//# sourceMappingURL=tryCatchOption.js.map