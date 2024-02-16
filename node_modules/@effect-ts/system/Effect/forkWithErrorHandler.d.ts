import type { Effect, RIO } from "./effect.js";
/**
 * Like fork but handles an error with the provided handler.
 *
 * @ets_data_first forkWithErrorHandler_
 */
export declare function forkWithErrorHandler<R2, E>(handler: (e: E) => RIO<R2, void>, __trace?: string): <R, A>(self: Effect<R, E, A>) => RIO<R & R2, import("../Fiber/context.js").FiberContext<E, A>>;
/**
 * Like fork but handles an error with the provided handler.
 */
export declare function forkWithErrorHandler_<R, R2, E, A>(self: Effect<R, E, A>, handler: (e: E) => RIO<R2, void>, __trace?: string): RIO<R & R2, import("../Fiber/context.js").FiberContext<E, A>>;
//# sourceMappingURL=forkWithErrorHandler.d.ts.map