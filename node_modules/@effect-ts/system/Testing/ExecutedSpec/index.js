"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecTypeId = exports.ExecutedTestCase = exports.ExecutedSuiteCase = exports.ExecutedSpecCaseTypeId = exports.ExecutedSpecCase = exports.ExecutedSpec = void 0;
exports.concreteExecutedSpecCase = concreteExecutedSpecCase;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a, _b; // ets_tracing: off


const ExecutedSpecCaseTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/ExecutedSpecCase");
exports.ExecutedSpecCaseTypeId = ExecutedSpecCaseTypeId;

class ExecutedSpecCase {
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

exports.ExecutedSpecCase = ExecutedSpecCase;
_a = ExecutedSpecCaseTypeId, T._E, T._A;

function concreteExecutedSpecCase(_) {//
}

class ExecutedSuiteCase extends ExecutedSpecCase {
  constructor(label, specs) {
    super();
    this.label = label;
    this.specs = specs;
    this._tag = "SuiteCase";
  }

}

exports.ExecutedSuiteCase = ExecutedSuiteCase;

class ExecutedTestCase extends ExecutedSpecCase {
  constructor(label, test, annotations) {
    super();
    this.label = label;
    this.test = test;
    this.annotations = annotations;
    this._tag = "TestCase";
  }

}

exports.ExecutedTestCase = ExecutedTestCase;
const SpecTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/Spec");
/**
 * An `ExecutedSpec` is a spec that has been run to produce test results.
 */

exports.SpecTypeId = SpecTypeId;

class ExecutedSpec {
  constructor(caseValue) {
    this.caseValue = caseValue;
    this[_b] = SpecTypeId;
  }

}

exports.ExecutedSpec = ExecutedSpec;
_b = SpecTypeId, T._E;
//# sourceMappingURL=index.js.map