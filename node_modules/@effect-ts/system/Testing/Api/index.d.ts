import * as T from "../../Effect/index.js";
import * as O from "../../Option/index.js";
import type * as Assert from "../Assertion/index.js";
import * as Spec from "../Spec/index.js";
import type { TestResult } from "../TestResult/index.js";
export declare function test(label: string, __trace?: string): (assertion: () => TestResult) => Spec.ZSpec<unknown, never>;
export declare function testM(label: string, __trace?: string): <R, E>(assertion: () => T.Effect<R, E, TestResult>) => Spec.ZSpec<R, E>;
export declare function suite(label: string): <Tests extends Spec.ZSpec<any, any>[]>(...tests: Tests) => Spec.ZSpec<[Tests[number]] extends [Spec.ZSpec<infer R, infer E>] ? R : never, [Tests[number]] extends [Spec.ZSpec<infer R_1, infer E_1>] ? E_1 : never>;
export declare function assert<A>(value: A, expression?: O.Option<string>, sourceLocation?: O.Option<string>): (assertion: Assert.Assertion<A>) => TestResult;
//# sourceMappingURL=index.d.ts.map