import * as Cause from "../Cause/core.js";
import type { Renderer } from "../Cause/Pretty/index.js";
import { HasClock } from "../Clock/index.js";
import type { Exit } from "../Exit/exit.js";
import { FiberContext } from "../Fiber/context.js";
import { Platform } from "../Fiber/platform.js";
import type { Callback } from "../Fiber/state.js";
import { HasRandom } from "../Random/index.js";
import * as Supervisor from "../Supervisor/index.js";
import type { Effect, UIO } from "./effect.js";
import type { FailureReporter } from "./primitives.js";
export declare type DefaultEnv = HasClock & HasRandom;
export declare const defaultEnv: DefaultEnv;
/**
 * Effect Canceler
 */
export declare type AsyncCancel<E, A> = UIO<Exit<E, A>>;
export declare const prettyReporter: FailureReporter;
export declare const defaultPlatform: Platform<Set<import("../Fiber/core.js").Runtime<any, any>>>;
export declare class CustomRuntime<R, X> {
    readonly env: R;
    readonly platform: Platform<X>;
    constructor(env: R, platform: Platform<X>);
    private fiberContext;
    supervised<Y>(supervisor: Supervisor.Supervisor<Y>): CustomRuntime<R, Y>;
    runFiber<E, A>(self: Effect<R, E, A>): FiberContext<E, A>;
    /**
     * Runs effect until completion, calling cb with the eventual exit state
     */
    run<E, A>(self: Effect<R, E, A>, cb?: Callback<E, A>): void;
    /**
     * Runs effect until completion returing a cancel effecr that when executed
     * triggers cancellation of the process
     */
    runCancel<E, A>(self: Effect<R, E, A>, cb?: Callback<E, A>): AsyncCancel<E, A>;
    /**
     * Run effect as a Promise, throwing a the first error or exception
     */
    runPromise<E, A>(self: Effect<R, E, A>): Promise<A>;
    /**
     * Run effect as a Promise of the Exit state
     * in case of error.
     */
    runPromiseExit<E, A>(self: Effect<R, E, A>): Promise<Exit<E, A>>;
    withEnvironment<R2>(f: (_: R) => R2): CustomRuntime<R2, X>;
    traceRenderer(renderer: Renderer): CustomRuntime<R, X>;
    traceExecution(b: boolean): CustomRuntime<R, X>;
    executionTraceLength(n: number): CustomRuntime<R, X>;
    traceStack(b: boolean): CustomRuntime<R, X>;
    stackTraceLength(n: number): CustomRuntime<R, X>;
    traceEffect(b: boolean): CustomRuntime<R, X>;
    initialTracingStatus(b: boolean): CustomRuntime<R, X>;
    ancestorExecutionTraceLength(n: number): CustomRuntime<R, X>;
    ancestorStackTraceLength(n: number): CustomRuntime<R, X>;
    ancestryLength(n: number): CustomRuntime<R, X>;
    reportFailure(reportFailure: (_: Cause.Cause<unknown>) => void): CustomRuntime<R, X>;
    maxOp(maxOp: number): CustomRuntime<R, X>;
}
/**
 * Construct custom runtime
 */
export declare function makeCustomRuntime<R, X>(env: R, platform: Platform<X>): CustomRuntime<R, X>;
/**
 * Default runtime
 */
export declare const defaultRuntime: CustomRuntime<DefaultEnv, Set<import("../Fiber/core.js").Runtime<any, any>>>;
/**
 * Exports of default runtime
 */
export declare const run: <E, A>(self: Effect<DefaultEnv, E, A>, cb?: Callback<E, A> | undefined) => void, runCancel: <E, A>(self: Effect<DefaultEnv, E, A>, cb?: Callback<E, A> | undefined) => AsyncCancel<E, A>, runFiber: <E, A>(self: Effect<DefaultEnv, E, A>) => FiberContext<E, A>, runPromise: <E, A>(self: Effect<DefaultEnv, E, A>) => Promise<A>, runPromiseExit: <E, A>(self: Effect<DefaultEnv, E, A>) => Promise<Exit<E, A>>;
/**
 * Use current environment to build a runtime that is capable of
 * providing its content to other effects.
 *
 * NOTE: in should be used in a region where current environment
 * is valid (i.e. keep attention to closed resources)
 */
export declare function runtime<R0>(): Effect<R0, never, CustomRuntime<R0, unknown>>;
export declare function withRuntimeM<R0, R, E, A>(f: (r: CustomRuntime<R0, unknown>) => Effect<R, E, A>): Effect<R0 & R, E, A>;
export declare function withRuntime<R0, A>(f: (r: CustomRuntime<R0, unknown>) => A): Effect<R0, never, A>;
//# sourceMappingURL=runtime.d.ts.map