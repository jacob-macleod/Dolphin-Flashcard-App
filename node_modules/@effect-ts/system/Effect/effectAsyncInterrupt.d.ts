import type { FiberID } from "../Fiber/id.js";
import type { Canceler } from "./Canceler.js";
import type { Cb } from "./Cb.js";
import type { Effect } from "./effect.js";
/**
 * Imports an asynchronous side-effect into an effect. The effect also
 * returns a canceler, which will be used by the runtime to cancel the
 * asynchronous effect if the fiber executing the effect is interrupted.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectAsyncInterrupt<R, E, A>(register: (cb: Cb<Effect<R, E, A>>) => Canceler<R>, __trace?: string): Effect<R, E, A>;
/**
 * Imports an asynchronous side-effect into an effect. The effect also
 * returns a canceler, which will be used by the runtime to cancel the
 * asynchronous effect if the fiber executing the effect is interrupted.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectAsyncInterruptBlockingOn<R, E, A>(register: (cb: Cb<Effect<R, E, A>>) => Canceler<R>, blockingOn: readonly FiberID[], __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=effectAsyncInterrupt.d.ts.map