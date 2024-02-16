"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absolve = absolve;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _chain = /*#__PURE__*/require("./chain.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _succeed = /*#__PURE__*/require("./succeed.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Submerges the error case of an `Either` into the `Stream`.
 */
function absolve(xs) {
  return (0, _chain.chain_)(xs, E.fold(_fail.fail, _succeed.succeed));
}
//# sourceMappingURL=absolve.js.map