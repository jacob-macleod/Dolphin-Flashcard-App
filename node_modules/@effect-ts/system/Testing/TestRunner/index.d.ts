import * as Clock from "../../Clock/index.js";
import * as T from "../../Effect/index.js";
import type { Platform } from "../../Fiber/index.js";
import type { Has } from "../../Has/index.js";
import * as L from "../../Layer/index.js";
import * as Annotations from "../Annotations/index.js";
import type { ExecutedSpec } from "../ExecutedSpec/index.js";
import type { ZSpec } from "../Spec/index.js";
import type { TestExecutor } from "../TestExecutor/index.js";
import type { TestLogger } from "../TestLogger/index.js";
import type { TestReporter } from "../TestReporter/index.js";
declare type TestRunnerEnv = Has<TestLogger> & Has<Clock.Clock>;
export declare class TestRunner<R, E> {
    readonly executor: TestExecutor<R, E>;
    readonly platform: Platform<unknown>;
    readonly reporter: TestReporter<E>;
    readonly bootstrap: L.Layer<unknown, never, TestRunnerEnv>;
    readonly runtime: T.CustomRuntime<undefined, unknown>;
    constructor(executor: TestExecutor<R, E>, platform?: Platform<unknown>, reporter?: TestReporter<E>, bootstrap?: L.Layer<unknown, never, TestRunnerEnv>);
    readonly run: (spec: ZSpec<R, E>) => T.RIO<TestRunnerEnv, ExecutedSpec<E>>;
}
export declare const defaultTestRunner: TestRunner<Has<Annotations.Annotations> & Clock.HasClock & import("../../Random/index.js").HasRandom, unknown>;
export {};
//# sourceMappingURL=index.d.ts.map