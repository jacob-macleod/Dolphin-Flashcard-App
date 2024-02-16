import * as ST from "../../Structural/index.mjs";
import * as PR from "../Primitives/index.mjs";
/**
 * An `AssertionM[A]` is capable of producing assertion results on an `A`. As a
 * proposition, assertions compose using logical conjunction and disjunction,
 * and can be negated.
 */

export class AssertionM {
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
export function isAssertionM(that) {
  return that instanceof AssertionM;
}
//# sourceMappingURL=AssertionM.mjs.map