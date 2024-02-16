import type { Cause } from "../../Cause/index.js";
import * as T from "../../Effect/index.js";
import type { Has } from "../../Has/index.js";
import type { Layer } from "../../Layer/index.js";
import type { Managed } from "../../Managed/index.js";
import * as M from "../../Managed/index.js";
import * as O from "../../Option/index.js";
import * as Annotations from "../Annotations/index.js";
import type { TestAnnotation } from "../TestAnnotation/index.js";
import * as TAM from "../TestAnnotationMap/index.js";
import type { TestFailure } from "../TestFailure/index.js";
import type { TestSuccess } from "../TestSuccess/index.js";
export declare const SpecCaseTypeId: unique symbol;
export declare type SpecCaseTypeId = typeof SpecCaseTypeId;
export declare abstract class SpecCase<R, E, T, A> {
    readonly [SpecCaseTypeId]: SpecCaseTypeId;
    readonly [T._R]: (_: R) => void;
    readonly [T._E]: () => E;
    readonly [T._T]: () => T;
    readonly [T._A]: () => A;
    map<B>(f: (a: A) => B): SpecCase<R, E, T, B>;
}
export declare function concreteSpecCase<R, E, T, A>(_: SpecCase<R, E, T, A>): asserts _ is SuiteCase<R, E, A> | TestCase<R, E, T>;
export declare class SuiteCase<R, E, A> extends SpecCase<R, E, never, A> {
    readonly label: string;
    readonly specs: M.Managed<R, E, readonly A[]>;
    readonly exec: O.Option<T.ExecutionStrategy>;
    readonly _tag = "SuiteCase";
    constructor(label: string, specs: M.Managed<R, E, readonly A[]>, exec: O.Option<T.ExecutionStrategy>);
}
export declare class TestCase<R, E, T> extends SpecCase<R, E, T, never> {
    readonly label: string;
    readonly test: T.Effect<R, E, T>;
    readonly annotations: TAM.TestAnnotationMap;
    readonly _tag = "TestCase";
    constructor(label: string, test: T.Effect<R, E, T>, annotations: TAM.TestAnnotationMap);
}
export declare const SpecTypeId: unique symbol;
export declare type SpecTypeId = typeof SpecTypeId;
/**
 * A `Spec[R, E, T]` is the backbone of _ZIO Test_. Every spec is either a
 * suite, which contains other specs, or a test of type `T`. All specs require
 * an environment of type `R` and may potentially fail with an error of type
 * `E`.
 */
export declare class Spec<R, E, T> {
    readonly caseValue: SpecCase<R, E, T, Spec<R, E, T>>;
    readonly [SpecTypeId]: SpecTypeId;
    readonly [T._R]: (_: R) => void;
    readonly [T._E]: () => E;
    readonly [T._T]: () => T;
    constructor(caseValue: SpecCase<R, E, T, Spec<R, E, T>>);
}
export declare function suite<R, E, T>(label: string, specs: M.Managed<R, E, readonly Spec<R, E, T>[]>, exec: O.Option<T.ExecutionStrategy>): Spec<R, E, T>;
export declare function test<R, E, T>(label: string, test: T.Effect<R, E, T>, annotations: TAM.TestAnnotationMap): Spec<R, E, T>;
export declare type ZSpec<R, E> = Spec<R, TestFailure<E>, TestSuccess>;
/**
 * Transforms the spec one layer at a time.
 */
export declare function transform<R, E, T, R1, E1, T1>(f: (_: SpecCase<R, E, T, Spec<R1, E1, T1>>) => SpecCase<R1, E1, T1, Spec<R1, E1, T1>>): (spec: Spec<R, E, T>) => Spec<R1, E1, T1>;
/**
 * Annotates each test in this spec with the specified test annotation.
 */
export declare function annotate<V>(key: TestAnnotation<V>, value: V): <R, E, T>(self: Spec<R, E, T>) => Spec<R, E, T>;
/**
 * Returns a new spec with the annotation map at each node.
 */
export declare function annotated<R, E, T>(self: Spec<R, E, T>): Spec<R & Has<Annotations.Annotations>, Annotations.Annotated<E>, Annotations.Annotated<T>>;
export declare function provideLayer<R0, E, R>(layer: Layer<R0, E, R>): <E1, T1>(self: Spec<R, E1, T1>) => Spec<R0, E | E1, T1>;
export declare function forEachExec<E, T, R1, E1, A1, R2, E2, A2>(defExec: T.ExecutionStrategy, failure: (_: Cause<E>) => T.Effect<R1, E1, A1>, success: (_: T) => T.Effect<R2, E2, A2>): <R>(self: Spec<R, E, T>) => Managed<R & R1 & R2, E1 | E2, Spec<R1 & R2, E1 | E2, A1 | A2>>;
export declare function foldM<R1, E1, Z>(defExec: T.ExecutionStrategy): <R, E, T>(f: (_: SpecCase<R, E, T, Z>) => M.Managed<R1, E1, Z>) => (self: Spec<R, E, T>) => Managed<R & R1, E1, Z>;
//# sourceMappingURL=index.d.ts.map