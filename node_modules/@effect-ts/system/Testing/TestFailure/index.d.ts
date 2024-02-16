import * as C from "../../Cause/index.js";
import * as T from "../../Effect/index.js";
import type * as TR from "../TestResult/index.js";
export declare const AssertionTypeId: unique symbol;
export declare class Assertion {
    readonly result: TR.TestResult;
    readonly _typeId: typeof AssertionTypeId;
    constructor(result: TR.TestResult);
}
export declare const RuntimeTypeId: unique symbol;
export declare class Runtime<E> {
    readonly cause: C.Cause<E>;
    readonly [T._E]: () => E;
    readonly _typeId: typeof RuntimeTypeId;
    constructor(cause: C.Cause<E>);
}
export declare type TestFailure<E> = Assertion | Runtime<E>;
/**
 * Constructs an assertion failure with the specified result.
 */
export declare function assertion(result: TR.TestResult): TestFailure<never>;
/**
 * Constructs a runtime failure that dies with the specified `Throwable`.
 */
export declare function die(e: unknown): TestFailure<never>;
/**
 * Constructs a runtime failure that fails with the specified error.
 */
export declare function fail<E>(e: E): TestFailure<E>;
/**
 * Constructs a runtime failure with the specified cause.
 */
export declare function halt<E>(cause: C.Cause<E>): TestFailure<E>;
//# sourceMappingURL=index.d.ts.map