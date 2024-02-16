"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.failureDetailsTypeId = exports.FailureDetails = void 0;
exports.label = label;
exports.label_ = label_;

var l = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionValue/label"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const failureDetailsTypeId = /*#__PURE__*/Symbol();
/**
 * `FailureDetails` keeps track of details relevant to failures.
 */

exports.failureDetailsTypeId = failureDetailsTypeId;

class FailureDetails {
  constructor(assertion) {
    this.assertion = assertion;
    this.typeId = failureDetailsTypeId;
  }

}

exports.FailureDetails = FailureDetails;

function label_(self, str) {
  const [h, ...tail] = self.assertion;
  return new FailureDetails([l.label_(h, str), ...tail]);
}

function label(str) {
  return self => label_(self, str);
}
//# sourceMappingURL=index.js.map