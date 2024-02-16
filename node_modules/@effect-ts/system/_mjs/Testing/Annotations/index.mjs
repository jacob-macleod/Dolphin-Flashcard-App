// ets_tracing: off
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as SortedSet from "../../Collections/Immutable/SortedSet/index.mjs";
import * as Tuple from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as FiberRef from "../../FiberRef/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { tag } from "../../Has/index.mjs";
import * as L from "../../Layer/index.mjs";
import * as St from "../../Structural/index.mjs";
import { fiberSet } from "../FiberSet/index.mjs";
import * as TestAnnotation from "../TestAnnotation/index.mjs";
import * as TAM from "../TestAnnotationMap/index.mjs";
export const AnnotationsId = /*#__PURE__*/Symbol();
/**
 * Tag for the Annotations service
 */

export const Annotations = /*#__PURE__*/tag(AnnotationsId);
/**
 * Constructs a new `Annotations` service.
 */

export const live = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.gen(function* (_) {
  const fiberRef = yield* _(FiberRef.make(TAM.TestAnnotationMap.empty));

  const annotate = (key, value) => FiberRef.update_(fiberRef, TAM.annotate(key, value));

  const get = key => T.map_(FiberRef.get(fiberRef), TAM.get(key));

  const withAnnotation = effect => FiberRef.locally_(fiberRef, TAM.TestAnnotationMap.empty)(T.foldM_(effect, e => T.flip(T.map_(FiberRef.get(fiberRef), _ => Tuple.tuple(e, _))), a => T.map_(FiberRef.get(fiberRef), _ => Tuple.tuple(a, _))));

  const supervisedFibers = T.descriptorWith(d => T.chain_(get(TestAnnotation.fibers), fa => {
    switch (fa._tag) {
      case "Left":
        {
          return T.succeed(fiberSet);
        }

      case "Right":
        {
          return T.map_(T.map_(T.forEach_(fa.right, ref => T.succeedWith(() => ref.get)), Chunk.reduce(fiberSet, SortedSet.union_)), SortedSet.filter(_ => !St.equals(_.id, d.id)));
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

export function withAnnotation(effect) {
  return T.accessServiceM(Annotations)(_ => _.withAnnotation(effect));
}
/**
 * Accesses an `Annotations` instance in the environment and appends the
 * specified annotation to the annotation map.
 */

export function annotate(key, value) {
  return T.accessServiceM(Annotations)(_ => _.annotate(key, value));
}
/**
 * Accesses an `Annotations` instance in the environment and retrieves the
 * annotation of the specified type, or its default value if there is none.
 */

export function get(key) {
  return T.accessServiceM(Annotations)(_ => _.get(key));
}
/**
 * Returns a set of all fibers in this test.
 */

export const supervisedFibers = /*#__PURE__*/T.accessServiceM(Annotations)(_ => _.supervisedFibers);
//# sourceMappingURL=index.mjs.map