import type { Exit } from "../Exit/exit.js";
import type { Runtime } from "../Fiber/core.js";
import type * as Fiber from "../Fiber/index.js";
import type { Scope } from "../Scope/index.js";
import type { Effect, RIO, UIO } from "./effect.js";
import type { FailureReporter } from "./primitives.js";
/**
 * Retrieves the scope that will be used to supervise forked effects.
 */
export declare const forkScope: UIO<Scope<Exit<any, any>>>;
export declare class ForkScopeRestore {
    private scope;
    constructor(scope: Scope<Exit<any, any>>);
    readonly restore: <R, E, A>(fa: Effect<R, E, A>, __trace?: string | undefined) => Effect<R, E, A>;
}
/**
 * Captures the fork scope, before overriding it with the specified new
 * scope, passing a function that allows restoring the fork scope to
 * what it was originally.
 */
export declare function forkScopeMask_<R, E, A>(newScope: Scope<Exit<any, any>>, f: (restore: ForkScopeRestore) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Captures the fork scope, before overriding it with the specified new
 * scope, passing a function that allows restoring the fork scope to
 * what it was originally.
 *
 * @ets_data_first forkScopeMask_
 */
export declare function forkScopeMask<R, E, A>(f: (restore: ForkScopeRestore) => Effect<R, E, A>, __trace?: string): (newScope: Scope<Exit<any, any>>) => Effect<R, E, A>;
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 */
export declare function raceWithScope_<R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(left: Effect<R, E, A>, right: Effect<R1, E1, A1>, leftWins: (exit: Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>, rightWins: (exit: Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>, scope: Scope<Exit<any, any>>, __trace?: string): Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWithScope_
 */
export declare function raceWithScope<E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(right: Effect<R1, E1, A1>, leftWins: (exit: Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>, rightWins: (exit: Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>, scope: Scope<Exit<any, any>>, __trace?: string): <R>(left: Effect<R, E, A>) => Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 */
export declare function raceWith_<R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(left: Effect<R, E, A>, right: Effect<R1, E1, A1>, leftWins: (exit: Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>, rightWins: (exit: Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>, __trace?: string): Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @ets_data_first raceWith_
 */
export declare function raceWith<E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(right: Effect<R1, E1, A1>, leftWins: (exit: Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>, rightWins: (exit: Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>, __trace?: string): <R>(left: Effect<R, E, A>) => Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Graft function
 */
export declare type Grafter = <R, E, A>(effect: Effect<R, E, A>, __trace?: string) => Effect<R, E, A>;
/**
 * Transplants specified effects so that when those effects fork other
 * effects, the forked effects will be governed by the scope of the
 * fiber that executes this effect.
 *
 * This can be used to "graft" deep grandchildren onto a higher-level
 * scope, effectively extending their lifespans into the parent scope.
 */
export declare function transplant<R, E, A>(f: (_: Grafter) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 */
export declare function forkDaemon<R, E, A>(value: Effect<R, E, A>, __trace?: string): RIO<R, Fiber.FiberContext<E, A>>;
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 *
 * @ets_data_first forkDaemonReport_
 */
export declare function forkDaemonReport(reportFailure: FailureReporter, __trace?: string): <R, E, A>(value: Effect<R, E, A>) => RIO<R, Fiber.FiberContext<E, A>>;
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 */
export declare function forkDaemonReport_<R, E, A>(value: Effect<R, E, A>, reportFailure: FailureReporter, __trace?: string): RIO<R, Fiber.FiberContext<E, A>>;
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
 * @ets_data_first forkIn_
 */
export declare function forkIn(scope: Scope<Exit<any, any>>, __trace?: string): <R, E, A>(value: Effect<R, E, A>) => RIO<R, Runtime<E, A>>;
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
export declare function forkIn_<R, E, A>(value: Effect<R, E, A>, scope: Scope<Exit<any, any>>, __trace?: string): RIO<R, Runtime<E, A>>;
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
 * @ets_data_first forkInReport_
 */
export declare function forkInReport(scope: Scope<Exit<any, any>>, reportFailure: FailureReporter, __trace?: string): <R, E, A>(value: Effect<R, E, A>) => RIO<R, Runtime<E, A>>;
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
export declare function forkInReport_<R, E, A>(value: Effect<R, E, A>, scope: Scope<Exit<any, any>>, reportFailure: FailureReporter, __trace?: string): RIO<R, Runtime<E, A>>;
/**
 * Retrieves the scope that will be used to supervise forked effects.
 */
export declare function forkScopeWith<R, E, A>(f: (_: Scope<Exit<any, any>>) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Returns a new effect that will utilize the specified scope to supervise
 * any fibers forked within the original effect.
 *
 * @ets_data_first overrideForkScope_
 */
export declare function overrideForkScope(scope: Scope<Exit<any, any>>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Returns a new effect that will utilize the specified scope to supervise
 * any fibers forked within the original effect.
 */
export declare function overrideForkScope_<R, E, A>(self: Effect<R, E, A>, scope: Scope<Exit<any, any>>, __trace?: string): Effect<R, E, A>;
/**
 * Returns a new effect that will utilize the default scope (fiber scope) to
 * supervise any fibers forked within the original effect.
 */
export declare function resetForkScope<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=core-scope.d.ts.map