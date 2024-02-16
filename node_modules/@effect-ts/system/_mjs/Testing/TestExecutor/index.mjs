// ets_tracing: off
import * as Cause from "../../Cause/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as M from "../../Managed/index.mjs";
import * as ES from "../ExecutedSpec/index.mjs";
import * as Spec from "../Spec/index.mjs";
import * as TAM from "../TestAnnotationMap/index.mjs";
import * as TF from "../TestFailure/index.mjs";
export function defaultExecutor(env) {
  return {
    environment: env,
    run: (spec, defExec) => M.use_(Spec.forEachExec(defExec, e => E.fold_(Cause.failureOrCause(e), ({
      tuple: [failure, annotations]
    }) => T.succeed(Tp.tuple(E.left(failure), annotations)), cause => T.succeed(Tp.tuple(E.left(TF.halt(cause)), TAM.TestAnnotationMap.empty))), ({
      tuple: [success, annotations]
    }) => T.succeed(Tp.tuple(E.right(success), annotations)))(Spec.provideLayer(env)(Spec.annotated(spec))), _ => M.useNow(Spec.foldM(defExec)(_ => {
      Spec.concreteSpecCase(_);

      switch (_._tag) {
        case "SuiteCase":
          {
            const v = _;
            return M.map_(v.specs, specs => new ES.ExecutedSpec(new ES.ExecutedSuiteCase(v.label, specs)));
          }

        case "TestCase":
          {
            const v = _;
            return T.toManaged(T.map_(v.test, ({
              tuple: [result, dynamicAnnotations]
            }) => new ES.ExecutedSpec(new ES.ExecutedTestCase(v.label, result, TAM.concat(v.annotations, dynamicAnnotations)))));
          }
      }
    })(_)))
  };
}
//# sourceMappingURL=index.mjs.map