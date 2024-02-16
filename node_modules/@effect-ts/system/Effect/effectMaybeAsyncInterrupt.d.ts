import type * as E from "../Either/index.js";
import type { FiberID } from "../Fiber/id.js";
import type { Canceler } from "./Canceler.js";
import type { Cb } from "./Cb.js";
import type { Effect } from "./effect.js";
/**
 * Imports an asynchronous side-effect into an effect. The side-effect
 * has the option of returning the value synchronously, which is useful in
 * cases where it cannot be determined if the effect is synchronous or
 * asynchronous until the side-effect is actually executed. The effect also
 * has the option of returning a canceler, which will be used by the runtime
 * to cancel the asynchronous effect if the fiber executing the effect is
 * interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function must not be called. Otherwise the callback function must be called
 * at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectMaybeAsyncInterrupt<R, E, A>(register: (cb: Cb<Effect<R, E, A>>) => E.Either<Canceler<R>, Effect<R, E, A>>, __trace?: string): Effect<R, E, A>;
/**
 * Imports an asynchronous side-effect into an effect. The side-effect
 * has the option of returning the value synchronously, which is useful in
 * cases where it cannot be determined if the effect is synchronous or
 * asynchronous until the side-effect is actually executed. The effect also
 * has the option of returning a canceler, which will be used by the runtime
 * to cancel the asynchronous effect if the fiber executing the effect is
 * interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function must not be called. Otherwise the callback function must be called
 * at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectMaybeAsyncInterruptBlockingOn<R, E, A>(register: (cb: Cb<Effect<R, E, A>>) => E.Either<Canceler<R>, Effect<R, E, A>>, blockingOn: readonly FiberID[], __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=effectMaybeAsyncInterrupt.d.ts.map