"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.and = and;
exports.label = label;
exports.label_ = label_;
exports.makeAssertionDirect = makeAssertionDirect;
exports.makeAssertionM = makeAssertionM;
exports.makeAssertionRecM = makeAssertionRecM;
exports.not = not;
exports.or = or;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var AMD = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionMData/index.js"));

var makeAssertionValue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionValue/makeAssertionValue.js"));

var BA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebra/index.js"));

var BAM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebraM/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Render/index.js"));

var _apply = /*#__PURE__*/require("./apply.js");

var _AssertionM = /*#__PURE__*/require("./AssertionM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new assertion that succeeds only if both assertions succeed.
 */
function and(self, that) {
  return new class extends _AssertionM.AssertionM {}(() => R.infix(R.param(self), "&&", R.param(that)), actual => BAM.and_(self.runM(actual), that().runM(actual)));
}
/**
 * Returns a new assertion that succeeds if either assertion succeeds.
 */


function or(self, that) {
  return new class extends _AssertionM.AssertionM {}(() => R.infix(R.param(self), "||", R.param(that)), actual => BAM.or_(self.runM(actual), that().runM(actual)));
}
/**
 * Labels this assertion with the specified string.
 */


function label_(self, str) {
  return (0, _apply.apply)(() => R.infix(R.param(self), "??", R.param(R.quoted(str))), self.runM);
}
/**
 * Labels this assertion with the specified string.
 */


function label(str) {
  return self => label_(self, str);
}
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */


function makeAssertionDirect(name, ...params) {
  return run => {
    return (0, _apply.apply)(() => R.function_(name, L.of(L.from(params))), run);
  };
}
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */


function makeAssertionM(name, ...params) {
  return run => {
    const assertion = makeAssertionDirect(name, ...params)(actual => {
      const actualValue = actual();
      return BAM.chain(p => {
        const result = () => p ? BA.success(makeAssertionValue.makeAssertionValue(assertion, () => actualValue, result)) : BA.failure(makeAssertionValue.makeAssertionValue(assertion, () => actualValue, result));

        return new BAM.BoolAlgebraM(T.succeed(result()));
      })(BAM.fromEffect(run(() => actualValue)));
    });
    return assertion;
  };
}
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */


function makeAssertionRecM(name, ...params) {
  return assertion => (get, orElse = AMD.asFailureM) => {
    const resultAssertion = () => makeAssertionDirect(name, ...params)(a => {
      const actualValue = a();
      return BAM.chain(p => {
        return O.fold_(p, () => orElse(AMD.makeAssertionMData(resultAssertion(), () => actualValue)), b => {
          return new BAM.BoolAlgebraM(T.map_(assertion.runM(() => b).run, p => {
            const result = () => BA.isSuccess(p) ? BA.success(makeAssertionValue.makeAssertionValue(assertion, () => actualValue, result)) : BA.failure(makeAssertionValue.makeAssertionValue(assertion, () => b, () => p));

            return result();
          }));
        });
      })(BAM.fromEffect(get(() => actualValue)));
    });

    return resultAssertion();
  };
}
/**
 * Makes a new assertion that negates the specified assertion.
 */


function not(assertion) {
  return makeAssertionDirect("not", R.param(assertion))(_ => BAM.not(assertion.runM(_)));
}
//# sourceMappingURL=api.js.map