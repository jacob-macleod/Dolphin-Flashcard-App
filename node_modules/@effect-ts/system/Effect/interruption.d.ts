import type { InterruptStatus } from "../Fiber/core.js";
import type { FiberID } from "../Fiber/id.js";
import type { Effect } from "./effect.js";
/**
 * Performs this effect uninterruptibly. This will prevent the effect from
 * being terminated externally, but the effect may fail for internal reasons
 * (e.g. an uncaught error) or terminate due to defect.
 *
 * Uninterruptible effects may recover from all failure causes (including
 * interruption of an inner effect that has been made interruptible).
 */
export declare const uninterruptible: <R, E, A>(effect: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Used to restore the inherited interruptibility
 */
export interface InterruptStatusRestore {
    readonly restore: <R, E, A>(effect: Effect<R, E, A>, __trace?: string) => Effect<R, E, A>;
    readonly force: <R, E, A>(effect: Effect<R, E, A>, __trace?: string) => Effect<R, E, A>;
}
export declare class InterruptStatusRestoreImpl implements InterruptStatusRestore {
    readonly flag: InterruptStatus;
    constructor(flag: InterruptStatus);
    restore<R, E, A>(effect: Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
    force<R, E, A>(effect: Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
}
/**
 * Makes the effect uninterruptible, but passes it a restore function that
 * can be used to restore the inherited interruptibility from whatever region
 * the effect is composed into.
 */
export declare function uninterruptibleMask<R, E, A>(f: (restore: InterruptStatusRestore) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted.
 */
export declare function onInterrupt_<R, E, A, R2, X>(self: Effect<R, E, A>, cleanup: (interruptors: readonly FiberID[]) => Effect<R2, never, X>, __trace?: string): Effect<R & R2, E, A>;
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted (allows for expanding error).
 */
export declare function onInterruptExtended_<R, E, A, R2, E2, X>(self: Effect<R, E, A>, cleanup: (interruptors: readonly FiberID[]) => Effect<R2, E2, X>, __trace?: string): Effect<R & R2, E | E2, A>;
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted.
 *
 * @ets_data_first onInterrupt_
 */
export declare function onInterrupt<R2, X>(cleanup: (interruptors: readonly FiberID[]) => Effect<R2, never, X>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E, A>;
/**
 * Returns an effect whose interruption will be disconnected from the
 * fiber's own interruption, being performed in the background without
 * slowing down the fiber's interruption.
 *
 * This method is useful to create "fast interrupting" effects. For
 * example, if you call this on a bracketed effect, then even if the
 * effect is "stuck" in acquire or release, its interruption will return
 * immediately, while the acquire / release are performed in the
 * background.
 *
 * See timeout and race for other applications.
 */
export declare function disconnect<R, E, A>(effect: Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Makes the effect interruptible, but passes it a restore function that
 * can be used to restore the inherited interruptibility from whatever region
 * the effect is composed into.
 */
export declare function interruptibleMask<R, E, A>(f: (restore: InterruptStatusRestore) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Returns an effect that is interrupted as if by the specified fiber.
 */
export declare function interruptAs(fiberId: FiberID, __trace?: string): import("./effect.js").IO<never, never>;
/**
 * Returns an effect that is interrupted by the current fiber
 */
export declare const interrupt: Effect<unknown, never, never>;
/**
 * Returns a new effect that performs the same operations as this effect, but
 * interruptibly, even if composed inside of an uninterruptible region.
 *
 * Note that effects are interruptible by default, so this function only has
 * meaning if used within an uninterruptible region.
 *
 * WARNING: This operator "punches holes" into effects, allowing them to be
 * interrupted in unexpected places. Do not use this operator unless you know
 * exactly what you are doing. Instead, you should use `uninterruptibleMask`.
 */
export declare function interruptible<R, E, A>(effect: Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=interruption.d.ts.map