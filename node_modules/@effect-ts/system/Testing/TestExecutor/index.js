"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultExecutor = defaultExecutor;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index5 = /*#__PURE__*/require("../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Managed/index.js"));

var ES = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ExecutedSpec/index.js"));

var Spec = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Spec/index.js"));

var TAM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestAnnotationMap/index.js"));

var TF = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestFailure/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function defaultExecutor(env) {
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
//# sourceMappingURL=index.js.map