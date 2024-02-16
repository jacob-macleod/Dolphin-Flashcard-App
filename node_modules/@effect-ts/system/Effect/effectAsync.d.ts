import type { FiberID } from "../Fiber/id.js";
import type { Cb } from "./Cb.js";
import type { Effect } from "./effect.js";
/**
 * Imports an asynchronous side-effect into a pure `Effect` value. See
 * `effectAsyncOption` for the more expressive variant of this function that
 * can return a value synchronously.
 *
 * The callback function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectAsync<R, E, A>(register: (cb: Cb<Effect<R, E, A>>) => void, __trace?: string): Effect<R, E, A>;
/**
 * Imports an asynchronous side-effect into a pure `Effect` value. See
 * `effectAsyncOption` for the more expressive variant of this function that
 * can return a value synchronously.
 *
 * The callback function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
export declare function effectAsyncBlockingOn<R, E, A>(register: (cb: Cb<Effect<R, E, A>>) => void, blockingOn: readonly FiberID[], __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=effectAsync.d.ts.map