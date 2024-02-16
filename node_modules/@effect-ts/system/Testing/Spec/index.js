"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestCase = exports.SuiteCase = exports.SpecTypeId = exports.SpecCaseTypeId = exports.SpecCase = exports.Spec = void 0;
exports.annotate = annotate;
exports.annotated = annotated;
exports.concreteSpecCase = concreteSpecCase;
exports.foldM = foldM;
exports.forEachExec = forEachExec;
exports.provideLayer = provideLayer;
exports.suite = suite;
exports.test = test;
exports.transform = transform;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tuple = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Annotations = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Annotations/index.js"));

var TAM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestAnnotationMap/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a, _b;

const SpecCaseTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/SpecCase");
exports.SpecCaseTypeId = SpecCaseTypeId;

class SpecCase {
  constructor() {
    this[_a] = SpecCaseTypeId;
  }

  map(f) {
    concreteSpecCase(this);

    switch (this._tag) {
      case "SuiteCase":
        {
          return new SuiteCase(this.label, M.map_(this.specs, _ => _.map(f)), this.exec);
        }

      case "TestCase":
        {
          return new TestCase(this.label, this.test, this.annotations);
        }
    }
  }

}

exports.SpecCase = SpecCase;
_a = SpecCaseTypeId, T._R, T._E, T._T, T._A;

function concreteSpecCase(_) {//
}

class SuiteCase extends SpecCase {
  constructor(label, specs, exec) {
    super();
    this.label = label;
    this.specs = specs;
    this.exec = exec;
    this._tag = "SuiteCase";
  }

}

exports.SuiteCase = SuiteCase;

class TestCase extends SpecCase {
  constructor(label, test, annotations) {
    super();
    this.label = label;
    this.test = test;
    this.annotations = annotations;
    this._tag = "TestCase";
  }

}

exports.TestCase = TestCase;
const SpecTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/Spec");
/**
 * A `Spec[R, E, T]` is the backbone of _ZIO Test_. Every spec is either a
 * suite, which contains other specs, or a test of type `T`. All specs require
 * an environment of type `R` and may potentially fail with an error of type
 * `E`.
 */

exports.SpecTypeId = SpecTypeId;

class Spec {
  constructor(caseValue) {
    this.caseValue = caseValue;
    this[_b] = SpecTypeId;
  }

}

exports.Spec = Spec;
_b = SpecTypeId, T._R, T._E, T._T;

function suite(label, specs, exec) {
  return new Spec(new SuiteCase(label, specs, exec));
}

function test(label, test, annotations) {
  return new Spec(new TestCase(label, test, annotations));
}
/**
 * Transforms the spec one layer at a time.
 */


function transform(f) {
  return spec => {
    concreteSpecCase(spec.caseValue);

    switch (spec.caseValue._tag) {
      case "SuiteCase":
        {
          return new Spec(f(new SuiteCase(spec.caseValue.label, M.map_(spec.caseValue.specs, _ => _.map(transform(f))), spec.caseValue.exec)));
        }

      case "TestCase":
        {
          return new Spec(f(spec.caseValue));
        }
    }
  };
}
/**
 * Annotates each test in this spec with the specified test annotation.
 */


function annotate(key, value) {
  return self => transform(specCase => {
    concreteSpecCase(specCase);

    switch (specCase._tag) {
      case "SuiteCase":
        {
          return specCase;
        }

      case "TestCase":
        {
          return new TestCase(specCase.label, specCase.test, TAM.annotate(key, value)(specCase.annotations));
        }
    }
  })(self);
}
/**
 * Returns a new spec with the annotation map at each node.
 */


function annotated(self) {
  return transform(specCase => {
    concreteSpecCase(specCase);

    switch (specCase._tag) {
      case "SuiteCase":
        {
          return new SuiteCase(specCase.label, M.mapError_(specCase.specs, _ => Tuple.tuple(_, TAM.TestAnnotationMap.empty)), specCase.exec);
        }

      case "TestCase":
        {
          return new TestCase(specCase.label, Annotations.withAnnotation(specCase.test), specCase.annotations);
        }
    }
  })(self);
}

function provideLayer(layer) {
  return self => transform(_ => {
    concreteSpecCase(_);

    switch (_._tag) {
      case "SuiteCase":
        return new SuiteCase(_.label, M.provideLayer_(_.specs, layer), _.exec);

      case "TestCase":
        return new TestCase(_.label, T.provideLayer_(_.test, layer), _.annotations);
    }
  })(self);
}

function forEachExec(defExec, failure, success) {
  return self => foldM(defExec)(_ => {
    concreteSpecCase(_);

    switch (_._tag) {
      case "SuiteCase":
        {
          const v = _;
          return M.foldCause_(v.specs, e => test(v.label, failure(e), TAM.TestAnnotationMap.empty), t => suite(v.label, M.succeed(t), v.exec));
        }

      case "TestCase":
        {
          const v = _;
          return T.toManaged(T.foldCause_(v.test, e => test(v.label, failure(e), v.annotations), e => test(v.label, success(e), v.annotations)));
        }
    }
  })(self);
}

function foldM(defExec) {
  return f => self => {
    concreteSpecCase(self.caseValue);

    switch (self.caseValue._tag) {
      case "SuiteCase":
        {
          const v = self.caseValue;
          return M.foldCauseM_(v.specs, c => f(new SuiteCase(v.label, M.halt(c), v.exec)), _ => M.chain_(M.forEachExec_(_, O.getOrElse_(v.exec, () => defExec), s => M.release(foldM(defExec)(f)(s))), z => f(new SuiteCase(v.label, M.succeed(Chunk.toArray(z)), v.exec))));
        }

      case "TestCase":
        return f(self.caseValue);
    }
  };
}
//# sourceMappingURL=index.js.map