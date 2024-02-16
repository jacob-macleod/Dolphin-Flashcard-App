// ets_tracing: off
import * as L from "../../Collections/Immutable/List/index.mjs";
import * as T from "../../Effect/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as AMD from "../AssertionMData/index.mjs";
import * as makeAssertionValue from "../AssertionValue/makeAssertionValue.mjs";
import * as BA from "../BoolAlgebra/index.mjs";
import * as BAM from "../BoolAlgebraM/index.mjs";
import * as R from "../Render/index.mjs";
import { apply } from "./apply.mjs";
import { AssertionM } from "./AssertionM.mjs";
/**
 * Returns a new assertion that succeeds only if both assertions succeed.
 */

export function and(self, that) {
  return new class extends AssertionM {}(() => R.infix(R.param(self), "&&", R.param(that)), actual => BAM.and_(self.runM(actual), that().runM(actual)));
}
/**
 * Returns a new assertion that succeeds if either assertion succeeds.
 */

export function or(self, that) {
  return new class extends AssertionM {}(() => R.infix(R.param(self), "||", R.param(that)), actual => BAM.or_(self.runM(actual), that().runM(actual)));
}
/**
 * Labels this assertion with the specified string.
 */

export function label_(self, str) {
  return apply(() => R.infix(R.param(self), "??", R.param(R.quoted(str))), self.runM);
}
/**
 * Labels this assertion with the specified string.
 */

export function label(str) {
  return self => label_(self, str);
}
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */

export function makeAssertionDirect(name, ...params) {
  return run => {
    return apply(() => R.function_(name, L.of(L.from(params))), run);
  };
}
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */

export function makeAssertionM(name, ...params) {
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

export function makeAssertionRecM(name, ...params) {
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

export function not(assertion) {
  return makeAssertionDirect("not", R.param(assertion))(_ => BAM.not(assertion.runM(_)));
}
//# sourceMappingURL=api.mjs.map