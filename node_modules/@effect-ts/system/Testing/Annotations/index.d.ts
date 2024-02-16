import * as SortedSet from "../../Collections/Immutable/SortedSet/index.js";
import * as Tuple from "../../Collections/Immutable/Tuple/index.js";
import * as T from "../../Effect/index.js";
import type * as Fiber from "../../Fiber/index.js";
import * as L from "../../Layer/index.js";
import * as TestAnnotation from "../TestAnnotation/index.js";
import * as TAM from "../TestAnnotationMap/index.js";
/**
 * An `Annotated[A]` contains a value of type `A` along with zero or more
 * test annotations.
 */
export declare type Annotated<A> = Tuple.Tuple<[A, TAM.TestAnnotationMap]>;
export declare const AnnotationsId: unique symbol;
/**
 * The `Annotations` trait provides access to an annotation map that tests
 * can add arbitrary annotations to. Each annotation consists of a string
 * identifier, an initial value, and a function for combining two values.
 * Annotations form monoids and you can think of `Annotations` as a more
 * structured logging service or as a super polymorphic version of the writer
 * monad effect.
 */
export interface Annotations {
    readonly serviceId: typeof AnnotationsId;
    readonly annotate: <V>(key: TestAnnotation.TestAnnotation<V>, value: V) => T.UIO<void>;
    readonly get: <V>(key: TestAnnotation.TestAnnotation<V>) => T.UIO<V>;
    readonly withAnnotation: <R, E, A>(self: T.Effect<R, E, A>) => T.Effect<R, Annotated<E>, Annotated<A>>;
    readonly supervisedFibers: T.UIO<SortedSet.SortedSet<Fiber.Runtime<unknown, unknown>>>;
}
/**
 * Tag for the Annotations service
 */
export declare const Annotations: import("../../Has/index.js").Tag<Annotations>;
/**
 * Constructs a new `Annotations` service.
 */
export declare const live: L.Layer<unknown, never, import("../../Has/index.js").Has<Annotations>>;
/**
 * Accesses an `Annotations` instance in the environment and executes the
 * specified effect with an empty annotation map, returning the annotation
 * map along with the result of execution.
 */
export declare function withAnnotation<R, E, A>(effect: T.Effect<R, E, A>): T.Effect<R & import("../../Has/index.js").Has<Annotations>, Annotated<E>, Annotated<A>>;
/**
 * Accesses an `Annotations` instance in the environment and appends the
 * specified annotation to the annotation map.
 */
export declare function annotate<V>(key: TestAnnotation.TestAnnotation<V>, value: V): T.Effect<import("../../Has/index.js").Has<Annotations>, never, void>;
/**
 * Accesses an `Annotations` instance in the environment and retrieves the
 * annotation of the specified type, or its default value if there is none.
 */
export declare function get<V>(key: TestAnnotation.TestAnnotation<V>): T.Effect<import("../../Has/index.js").Has<Annotations>, never, V>;
/**
 * Returns a set of all fibers in this test.
 */
export declare const supervisedFibers: T.Effect<import("../../Has/index.js").Has<Annotations>, never, SortedSet.SortedSet<Fiber.Runtime<unknown, unknown>>>;
//# sourceMappingURL=index.d.ts.map