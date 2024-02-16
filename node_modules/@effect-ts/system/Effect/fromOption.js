"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromNullable = fromNullable;
exports.fromOption = fromOption;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Lifts an `Option` into a `Effect` but preserves the error as an option in the error channel, making it easier to compose
 * in some scenarios.
 */
function fromOption(o, __trace) {
  return o._tag === "None" ? (0, _fail.fail)(O.none, __trace) : (0, _core.succeed)(o.value, __trace);
}
/**
 * Lifts a nullable value into a `Effect` but preserves the error as an option in the error channel, making it easier to compose
 * in some scenarios.
 */


function fromNullable(o, __trace) {
  return fromOption(O.fromNullable(o), __trace);
}
//# sourceMappingURL=fromOption.js.map