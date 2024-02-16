// ets_tracing: off
import * as L from "../../Collections/Immutable/List/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as O from "../../Option/index.mjs";
import * as ST from "../../Structural/index.mjs";
import * as AD from "../AssertionData/index.mjs";
import * as makeAssertionValue from "../AssertionValue/makeAssertionValue.mjs";
import * as BA from "../BoolAlgebra/index.mjs";
import * as BAM from "../BoolAlgebraM/index.mjs";
import * as PR from "../Primitives/index.mjs";
import * as R from "../Render/index.mjs";
export class Assertion {
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
export function isAssertion(that) {
  return that instanceof Assertion;
}
export function makeAssertion(name, ...params) {
  return run => {
    const assertion = makeAssertionDirect(name, ...params)(actual => {
      const actualValue = actual();

      const result = () => run(() => actualValue) ? BA.success(makeAssertionValue.makeAssertionValue(assertion, () => actualValue, result)) : BA.failure(makeAssertionValue.makeAssertionValue(assertion, () => actualValue, result));

      return result();
    });
    return assertion;
  };
}
export function makeAssertionDirect(name, ...params) {
  return run => new Assertion(() => R.function_(name, L.of(L.from(params))), run);
}
export const isFalse = /*#__PURE__*/makeAssertion("isFalse")(a => !a());
export const isEmptyString = /*#__PURE__*/makeAssertion("isEmptyString")(a => a().length === 0);
export function equalTo(expected) {
  return makeAssertion("EqualTo", R.param(expected))(actual => {
    const actualValue = actual();
    return ST.equals(expected, actualValue);
  });
}
export function makeAssertionRec(name, ...params) {
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
export function hasProperty(name, proj, assertion) {
  return makeAssertionRec("hasField", R.param(R.quoted(name)), R.param(R.field(name)), R.param(assertion))(assertion)(actual => {
    return O.some(proj(actual()));
  });
}
export function and(self, that) {
  return new Assertion(() => R.infix(R.param(self), "&&", R.param(that)), actual => BA.and_(self.run(actual), that.run(actual)));
}
export function or(self, that) {
  return new Assertion(() => R.infix(R.param(self), "||", R.param(that)), actual => BA.or_(self.run(actual), that.run(actual)));
}
//# sourceMappingURL=index.mjs.map