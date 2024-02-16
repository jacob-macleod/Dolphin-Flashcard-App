"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.label = label;
exports.label_ = label_;

var AM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionM/api.js"));

var _makeAssertionValue = /*#__PURE__*/require("./makeAssertionValue.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function label_(self, l) {
  return (0, _makeAssertionValue.makeAssertionValue)(AM.label_(self.assertion, l), self.value, self.result, self.expression, self.sourceLocation);
}

function label(l) {
  return self => label_(self, l);
}
//# sourceMappingURL=label.js.map