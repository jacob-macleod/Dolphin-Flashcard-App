"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsId = exports.Annotations = void 0;
exports.annotate = annotate;
exports.get = get;
exports.supervisedFibers = exports.live = void 0;
exports.withAnnotation = withAnnotation;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var SortedSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/SortedSet/index.js"));

var Tuple = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var FiberRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../FiberRef/index.js"));

var _index6 = /*#__PURE__*/require("../../Function/index.js");

var _index7 = /*#__PURE__*/require("../../Has/index.js");

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Structural/index.js"));

var _index10 = /*#__PURE__*/require("../FiberSet/index.js");

var TestAnnotation = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestAnnotation/index.js"));

var TAM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestAnnotationMap/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const AnnotationsId = /*#__PURE__*/Symbol();
/**
 * Tag for the Annotations service
 */

exports.AnnotationsId = AnnotationsId;
const Annotations = /*#__PURE__*/(0, _index7.tag)(AnnotationsId);
/**
 * Constructs a new `Annotations` service.
 */

exports.Annotations = Annotations;
const live = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.gen(function* (_) {
  const fiberRef = yield* _(FiberRef.make(TAM.TestAnnotationMap.empty));

  const annotate = (key, value) => FiberRef.update_(fiberRef, TAM.annotate(key, value));

  const get = key => T.map_(FiberRef.get(fiberRef), TAM.get(key));

  const withAnnotation = effect => FiberRef.locally_(fiberRef, TAM.TestAnnotationMap.empty)(T.foldM_(effect, e => T.flip(T.map_(FiberRef.get(fiberRef), _ => Tuple.tuple(e, _))), a => T.map_(FiberRef.get(fiberRef), _ => Tuple.tuple(a, _))));

  const supervisedFibers = T.descriptorWith(d => T.chain_(get(TestAnnotation.fibers), fa => {
    switch (fa._tag) {
      case "Left":
        {
          return T.succeed(_index10.fiberSet);
        }

      case "Right":
        {
          return T.map_(T.map_(T.forEach_(fa.right, ref => T.succeedWith(() => ref.get)), Chunk.reduce(_index10.fiberSet, SortedSet.union_)), SortedSet.filter(_ => !St.equals(_.id, d.id)));
        }
    }
  }));
  const annotations = {
    serviceId: AnnotationsId,
    annotate,
    get,
    supervisedFibers,
    withAnnotation
  };
  return annotations;
}), Annotations);
/**
 * Accesses an `Annotations` instance in the environment and executes the
 * specified effect with an empty annotation map, returning the annotation
 * map along with the result of execution.
 */

exports.live = live;

function withAnnotation(effect) {
  return T.accessServiceM(Annotations)(_ => _.withAnnotation(effect));
}
/**
 * Accesses an `Annotations` instance in the environment and appends the
 * specified annotation to the annotation map.
 */


function annotate(key, value) {
  return T.accessServiceM(Annotations)(_ => _.annotate(key, value));
}
/**
 * Accesses an `Annotations` instance in the environment and retrieves the
 * annotation of the specified type, or its default value if there is none.
 */


function get(key) {
  return T.accessServiceM(Annotations)(_ => _.get(key));
}
/**
 * Returns a set of all fibers in this test.
 */


const supervisedFibers = /*#__PURE__*/T.accessServiceM(Annotations)(_ => _.supervisedFibers);
exports.supervisedFibers = supervisedFibers;
//# sourceMappingURL=index.js.map