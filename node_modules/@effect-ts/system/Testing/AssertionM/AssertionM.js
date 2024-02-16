"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertionM = void 0;
exports.isAssertionM = isAssertionM;

var ST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Structural/index.js"));

var PR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Primitives/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * An `AssertionM[A]` is capable of producing assertion results on an `A`. As a
 * proposition, assertions compose using logical conjunction and disjunction,
 * and can be negated.
 */
class AssertionM {
  constructor(render, runM) {
    this.render = render;
    this.runM = runM;
  }

  get stringify() {
    return this.render().toString();
  }

  toString() {
    return this.stringify;
  }

  [(PR._A, ST.equalsSym)](that) {
    if (isAssertionM(that)) {
      return this.stringify === that.stringify;
    }

    return false;
  }

  get [ST.hashSym]() {
    return ST.hashString(this.stringify);
  }

}

exports.AssertionM = AssertionM;

function isAssertionM(that) {
  return that instanceof AssertionM;
}
//# sourceMappingURL=AssertionM.js.map