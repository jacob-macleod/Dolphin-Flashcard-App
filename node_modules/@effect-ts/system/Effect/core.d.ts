import type { Cause } from "../Cause/cause.js";
import * as Exit from "../Exit/core.js";
import type * as Fiber from "../Fiber/index.js";
import * as O from "../Option/index.js";
import type { Supervisor } from "../Supervisor/index.js";
import type { Effect, IO, RIO, UIO } from "./effect.js";
import type { FailureReporter } from "./primitives.js";
/**
 * Effectfully accesses the environment of the effect.
 */
export declare function access<R0, A>(f: (_: R0) => A, __trace?: string): RIO<R0, A>;
/**
 * Effectfully accesses the environment of the effect.
 */
export declare function accessM<R0, R, E, A>(f: (_: R0) => Effect<R, E, A>, __trace?: string): Effect<R & R0, E, A>;
/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 *
 * @ets_data_first chain_
 */
export declare function chain<R1, E1, A1, A>(f: (a: A) => Effect<R1, E1, A1>, __trace?: string): <R, E>(val: Effect<R, E, A>) => Effect<R & R1, E1 | E, A1>;
/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 */
export declare function chain_<R, E, A, R1, E1, A1>(val: Effect<R, E, A>, f: (a: A) => Effect<R1, E1, A1>, __trace?: string): Effect<R & R1, E | E1, A1>;
/**
 * Constructs an effect based on information about the current fiber, such as
 * its identity.
 */
export declare function descriptorWith<R, E, A>(f: (_: Fiber.Descriptor) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Checks the interrupt status, and produces the effect returned by the
 * specified callback.
 */
export declare function checkInterruptible<R, E, A>(f: (_: Fiber.InterruptStatus) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Capture trace at the current point
 */
export declare const trace: UIO<Fiber.Trace>;
/**
 * Checks the tracing status, and produces the effect returned by the
 * specified callback.
 */
export declare function checkTraced<R, E, A>(f: (_: boolean) => Effect<R, E, A>): Effect<R, E, A>;
/**
 * Disables Effect tracing facilities for the duration of the effect.
 *
 * Note: Effect tracing is cached, as such after the first iteration
 * it has a negligible effect on performance of hot-spots (Additional
 * hash map lookup per flatMap). As such, using `untraced` sections
 * is not guaranteed to result in a noticeable performance increase.
 */
export declare function untraced<R, E, A>(self: Effect<R, E, A>): Effect<R, E, A>;
/**
 * Enables Effect tracing for this effect. Because this is the default, this
 * operation only has an additional meaning if the effect is located within
 * an `untraced` section, or the current fiber has been spawned by a parent
 * inside an `untraced` section.
 */
export declare function traced<R, E, A>(self: Effect<R, E, A>): Effect<R, E, A>;
/**
 * Imports an asynchronous effect into a pure `Effect` value, possibly returning
 * the value synchronously.
 *
 * If the register function returns a value synchronously, then the callback
 * function `AsyncRE<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectAsyncOption<R, E, A>(register: (cb: (_: Effect<R, E, A>) => void) => O.Option<Effect<R, E, A>>, __trace?: string): Effect<R, E, A>;
/**
 * Imports an asynchronous effect into a pure `Effect` value, possibly returning
 * the value synchronously.
 *
 * If the register function returns a value synchronously, then the callback
 * function `AsyncRE<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectAsyncOptionBlockingOn<R, E, A>(register: (cb: (_: Effect<R, E, A>) => void) => O.Option<Effect<R, E, A>>, blockingOn: readonly Fiber.FiberID[], __trace?: string): Effect<R, E, A>;
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects creating with `halt`.
 */
export declare function tryCatch<E, A>(effect: () => A, onThrow: (u: unknown) => E, __trace?: string): IO<E, A>;
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects creating with `halt`.
 */
declare function try_<A>(effect: () => A, __trace?: string): IO<unknown, A>;
export { try_ as try };
/**
 * Imports a synchronous side-effect into a pure value
 */
export declare function succeedWith<A>(effect: () => A, __trace?: string): UIO<A>;
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCauseM_
 */
export declare function foldCauseM<E, A, R2, E2, A2, R3, E3, A3>(failure: (cause: Cause<E>) => Effect<R2, E2, A2>, success: (a: A) => Effect<R3, E3, A3>, __trace?: string): <R>(value: Effect<R, E, A>) => Effect<R & R2 & R3, E2 | E3, A2 | A3>;
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 */
export declare function foldCauseM_<R, E, A, R2, E2, A2, R3, E3, A3>(value: Effect<R, E, A>, failure: (cause: Cause<E>) => Effect<R2, E2, A2>, success: (a: A) => Effect<R3, E3, A3>, __trace?: string): Effect<R & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 */
export declare function fork<R, E, A>(value: Effect<R, E, A>, __trace?: string): RIO<R, Fiber.FiberContext<E, A>>;
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 *
 * @ets_data_first forkReport_
 */
export declare function forkReport(reportFailure: FailureReporter, __trace?: string): <R, E, A>(value: Effect<R, E, A>) => RIO<R, Fiber.FiberContext<E, A>>;
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin
 * executing the effect.
 *
 * The returned fiber can be used to interrupt the forked fiber, await its
 * result, or join the fiber. See `Fiber` for more information.
 *
 * The fiber is forked with interrupt supervision mode, meaning that when the
 * fiber that forks the child exits, the child will be interrupted.
 */
export declare function forkReport_<R, E, A>(value: Effect<R, E, A>, reportFailure: FailureReporter, __trace?: string): RIO<R, Fiber.FiberContext<E, A>>;
/**
 * Returns an effect that models failure with the specified `Cause`.
 */
export declare function halt<E>(cause: Cause<E>, __trace?: string): IO<E, never>;
/**
 * Returns an effect that models failure with the specified `Cause`.
 *
 * This version takes in a lazily-evaluated trace that can be attached to the `Cause`
 * via `Cause.Traced`.
 */
export declare function haltWith<E>(cause: (_: () => Fiber.Trace) => Cause<E>, __trace?: string): IO<E, never>;
/**
 * Switches the interrupt status for this effect. If `true` is used, then the
 * effect becomes interruptible (the default), while if `false` is used, then
 * the effect becomes uninterruptible. These changes are compositional, so
 * they only affect regions of the effect.
 *
 * @ets_data_first interruptStatus_
 */
export declare function interruptStatus(flag: Fiber.InterruptStatus, __trace?: string): <R, E, A>(effect: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Switches the interrupt status for this effect. If `true` is used, then the
 * effect becomes interruptible (the default), while if `false` is used, then
 * the effect becomes uninterruptible. These changes are compositional, so
 * they only affect regions of the effect.
 */
export declare function interruptStatus_<R, E, A>(effect: Effect<R, E, A>, flag: Fiber.InterruptStatus, __trace?: string): Effect<R, E, A>;
/**
 * Toggles Effect tracing support for this effect. If `true` is used, then the
 * effect will accumulate traces, while if `false` is used, then tracing
 * is disabled. These changes are compositional, so they only affect regions
 * of the effect.
 *
 * @ets_data_first tracingStatus_
 */
export declare function tracingStatus(flag: boolean): <R, E, A>(effect: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Toggles Effect tracing support for this effect. If `true` is used, then the
 * effect will accumulate traces, while if `false` is used, then tracing
 * is disabled. These changes are compositional, so they only affect regions
 * of the effect.
 */
export declare function tracingStatus_<R, E, A>(effect: Effect<R, E, A>, flag: boolean): Effect<R, E, A>;
/**
 * Provides the `Effect` effect with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */
export declare function provideAll<R>(r: R, __trace?: string): <E, A>(next: Effect<R, E, A>) => Effect<unknown, E, A>;
/**
 * Provides the `Effect` effect with its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll_<R, E, A>(next: Effect<R, E, A>, r: R, __trace?: string): Effect<unknown, E, A>;
/**
 * Returns an effect that semantically runs the effect on a fiber,
 * producing an `Exit` for the completion value of the fiber.
 */
export declare function result<R, E, A>(value: Effect<R, E, A>, __trace?: string): Effect<R, never, Exit.Exit<E, A>>;
/**
 * Lift a pure value into an effect
 */
export declare function succeed<A>(a: A, __trace?: string): Effect<unknown, never, A>;
/**
 * Returns an effect with the behavior of this one, but where all child
 * fibers forked in the effect are reported to the specified supervisor.
 *
 * @ets_data_first supervised_
 */
export declare function supervised(supervisor: Supervisor<any>, __trace?: string): <R, E, A>(fa: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Returns an effect with the behavior of this one, but where all child
 * fibers forked in the effect are reported to the specified supervisor.
 */
export declare function supervised_<R, E, A>(fa: Effect<R, E, A>, supervisor: Supervisor<any>, __trace?: string): Effect<R, E, A>;
/**
 * Returns a lazily constructed effect, whose construction may itself require effects.
 * When no environment is required (i.e., when R == unknown) it is conceptually equivalent to `flatten(succeedWith(io))`.
 */
export declare function suspend<R, E, A>(factory: (platform: Fiber.Platform<unknown>, id: Fiber.FiberID) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Returns a lazily constructed effect, whose construction may itself require effects.
 * When no environment is required (i.e., when R == unknown) it is conceptually equivalent to `flatten(tryCatch(orThrow, io))`.
 */
export declare function tryCatchSuspend<R, E, A, E2>(factory: (platform: Fiber.Platform<unknown>, id: Fiber.FiberID) => Effect<R, E, A>, onThrow: (u: unknown) => E2, __trace?: string): Effect<R, E | E2, A>;
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain defects,
 * executes `success` in case of successes
 */
export declare function tryOrElse_<R, E, A, R2, E2, A2, R3, E3, A3>(self: Effect<R, E, A>, that: () => Effect<R2, E2, A2>, success: (a: A) => Effect<R3, E3, A3>, __trace?: string): Effect<R & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain defects,
 * executes `success` in case of successes
 *
 * @ets_data_first tryOrElse_
 */
export declare function tryOrElse<A, R2, E2, A2, R3, E3, A3>(that: () => Effect<R2, E2, A2>, success: (a: A) => Effect<R3, E3, A3>, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 */
export declare const unit: UIO<void>;
/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 */
export declare const unitTraced: (__trace?: string | undefined) => UIO<void>;
/**
 * Returns an effect that yields to the runtime system, starting on a fresh
 * stack. Manual use of this method can improve fairness, at the cost of
 * overhead.
 */
export declare const yieldNow: UIO<void>;
/**
 * Checks the current platform
 */
export declare function checkPlatform<R, E, A>(f: (_: Fiber.Platform<unknown>) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=core.d.ts.map