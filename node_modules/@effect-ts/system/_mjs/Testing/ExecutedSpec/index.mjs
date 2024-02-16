var _a, _b; // ets_tracing: off


import * as T from "../../Effect/index.mjs";
export const ExecutedSpecCaseTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/ExecutedSpecCase");
export class ExecutedSpecCase {
  constructor() {
    this[_a] = ExecutedSpecCaseTypeId;
  }

  map(f) {
    concreteExecutedSpecCase(this);

    switch (this._tag) {
      case "SuiteCase":
        {
          return new ExecutedSuiteCase(this.label, this.specs.map(f));
        }

      case "TestCase":
        {
          return new ExecutedTestCase(this.label, this.test, this.annotations);
        }
    }
  }

}
_a = ExecutedSpecCaseTypeId, T._E, T._A;
export function concreteExecutedSpecCase(_) {//
}
export class ExecutedSuiteCase extends ExecutedSpecCase {
  constructor(label, specs) {
    super();
    this.label = label;
    this.specs = specs;
    this._tag = "SuiteCase";
  }

}
export class ExecutedTestCase extends ExecutedSpecCase {
  constructor(label, test, annotations) {
    super();
    this.label = label;
    this.test = test;
    this.annotations = annotations;
    this._tag = "TestCase";
  }

}
export const SpecTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/Spec");
/**
 * An `ExecutedSpec` is a spec that has been run to produce test results.
 */

export class ExecutedSpec {
  constructor(caseValue) {
    this.caseValue = caseValue;
    this[_b] = SpecTypeId;
  }

}
_b = SpecTypeId, T._E;
//# sourceMappingURL=index.mjs.map