var _a, _b;

import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tuple from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../Effect/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as M from "../../Managed/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Annotations from "../Annotations/index.mjs";
import * as TAM from "../TestAnnotationMap/index.mjs";
export const SpecCaseTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/SpecCase");
export class SpecCase {
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
_a = SpecCaseTypeId, T._R, T._E, T._T, T._A;
export function concreteSpecCase(_) {//
}
export class SuiteCase extends SpecCase {
  constructor(label, specs, exec) {
    super();
    this.label = label;
    this.specs = specs;
    this.exec = exec;
    this._tag = "SuiteCase";
  }

}
export class TestCase extends SpecCase {
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
 * A `Spec[R, E, T]` is the backbone of _ZIO Test_. Every spec is either a
 * suite, which contains other specs, or a test of type `T`. All specs require
 * an environment of type `R` and may potentially fail with an error of type
 * `E`.
 */

export class Spec {
  constructor(caseValue) {
    this.caseValue = caseValue;
    this[_b] = SpecTypeId;
  }

}
_b = SpecTypeId, T._R, T._E, T._T;
export function suite(label, specs, exec) {
  return new Spec(new SuiteCase(label, specs, exec));
}
export function test(label, test, annotations) {
  return new Spec(new TestCase(label, test, annotations));
}
/**
 * Transforms the spec one layer at a time.
 */

export function transform(f) {
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

export function annotate(key, value) {
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

export function annotated(self) {
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
export function provideLayer(layer) {
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
export function forEachExec(defExec, failure, success) {
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
export function foldM(defExec) {
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
//# sourceMappingURL=index.mjs.map