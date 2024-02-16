import * as T from "../../Effect/index.js";
import * as E from "../../Either/index.js";
import type * as TAM from "../TestAnnotationMap/index.js";
import type { TestFailure } from "../TestFailure/index.js";
import type { TestSuccess } from "../TestSuccess/index.js";
export declare const ExecutedSpecCaseTypeId: unique symbol;
export declare type ExecutedSpecCaseTypeId = typeof ExecutedSpecCaseTypeId;
export declare abstract class ExecutedSpecCase<E, A> {
    readonly [ExecutedSpecCaseTypeId]: ExecutedSpecCaseTypeId;
    readonly [T._E]: () => E;
    readonly [T._A]: () => A;
    map<B>(f: (a: A) => B): ExecutedSpecCase<E, B>;
}
export declare function concreteExecutedSpecCase<E, A>(_: ExecutedSpecCase<E, A>): asserts _ is ExecutedSuiteCase<E, A> | ExecutedTestCase<E>;
export declare class ExecutedSuiteCase<E, A> extends ExecutedSpecCase<E, A> {
    readonly label: string;
    readonly specs: readonly A[];
    readonly _tag = "SuiteCase";
    constructor(label: string, specs: readonly A[]);
}
export declare class ExecutedTestCase<E> extends ExecutedSpecCase<E, never> {
    readonly label: string;
    readonly test: E.Either<TestFailure<E>, TestSuccess>;
    readonly annotations: TAM.TestAnnotationMap;
    readonly _tag = "TestCase";
    constructor(label: string, test: E.Either<TestFailure<E>, TestSuccess>, annotations: TAM.TestAnnotationMap);
}
export declare const SpecTypeId: unique symbol;
export declare type SpecTypeId = typeof SpecTypeId;
/**
 * An `ExecutedSpec` is a spec that has been run to produce test results.
 */
export declare class ExecutedSpec<E> {
    readonly caseValue: ExecutedSpecCase<E, ExecutedSpec<E>>;
    readonly [SpecTypeId]: SpecTypeId;
    readonly [T._E]: () => E;
    constructor(caseValue: ExecutedSpecCase<E, ExecutedSpec<E>>);
}
//# sourceMappingURL=index.d.ts.map