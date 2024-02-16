"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Assertion = void 0;
exports.and = and;
exports.equalTo = equalTo;
exports.hasProperty = hasProperty;
exports.isAssertion = isAssertion;
exports.isFalse = exports.isEmptyString = void 0;
exports.makeAssertion = makeAssertion;
exports.makeAssertionDirect = makeAssertionDirect;
exports.makeAssertionRec = makeAssertionRec;
exports.or = or;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var ST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Structural/index.js"));

var AD = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionData/index.js"));

var makeAssertionValue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionValue/makeAssertionValue.js"));

var BA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebra/index.js"));

var BAM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebraM/index.js"));

var PR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Primitives/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Render/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Assertion {
  constructor(render, run) {
    this.render = render;
    this.run = run;
    this.runM = this.runM.bind(this);
    this.toString = this.toString.bind(this);
  }

  runM(a) {
    return new BAM.BoolAlgebraM(T.succeed(this.run(a)));
  }

  get stringify() {
    return this.render().toString();
  }

  toString() {
    return this.stringify;
  }

  [(PR._A, ST.equalsSym)](that) {
    if (isAssertion(that)) {
      return this.stringify === that.stringify;
    }

    return false;
  }

  get [ST.hashSym]() {
    return ST.hashString(this.stringify);
  }

}

exports.Assertion = Assertion;

function isAssertion(that) {
  return that instanceof Assertion;
}

function makeAssertion(name, ...params) {
  return run => {
    const assertion = makeAssertionDirect(name, ...params)(actual => {
      const actualValue = actual();

      const result = () => run(() => actualValue) ? BA.success(makeAssertionValue.makeAssertionValue(assertion, () => actualValue, result)) : BA.failure(makeAssertionValue.makeAssertionValue(assertion, () => actualValue, result));

      return result();
    });
    return assertion;
  };
}

function makeAssertionDirect(name, ...params) {
  return run => new Assertion(() => R.function_(name, L.of(L.from(params))), run);
}

const isFalse = /*#__PURE__*/makeAssertion("isFalse")(a => !a());
exports.isFalse = isFalse;
const isEmptyString = /*#__PURE__*/makeAssertion("isEmptyString")(a => a().length === 0);
exports.isEmptyString = isEmptyString;

function equalTo(expected) {
  return makeAssertion("EqualTo", R.param(expected))(actual => {
    const actualValue = actual();
    return ST.equals(expected, actualValue);
  });
}

function makeAssertionRec(name, ...params) {
  return assertion => {
    return (get, orElse = AD.asFailure) => {
      const resultAssertion = () => makeAssertionDirect(name, ...params)(a => {
        const actualValue = a();
        return O.fold_(get(a), () => orElse(AD.makeAssertionData(resultAssertion(), actualValue)), b => {
          const innerResult = assertion.run(() => b);

          const result = () => BA.isSuccess(innerResult) ? BA.success(makeAssertionValue.makeAssertionValue(resultAssertion(), () => actualValue, result)) : BA.failure(makeAssertionValue.makeAssertionValue(resultAssertion(), () => b, () => innerResult));

          return result();
        });
      });

      return resultAssertion();
    };
  };
}

function hasProperty(name, proj, assertion) {
  return makeAssertionRec("hasField", R.param(R.quoted(name)), R.param(R.field(name)), R.param(assertion))(assertion)(actual => {
    return O.some(proj(actual()));
  });
}

function and(self, that) {
  return new Assertion(() => R.infix(R.param(self), "&&", R.param(that)), actual => BA.and_(self.run(actual), that.run(actual)));
}

function or(self, that) {
  return new Assertion(() => R.infix(R.param(self), "||", R.param(that)), actual => BA.or_(self.run(actual), that.run(actual)));
}
//# sourceMappingURL=index.js.map