import * as R from "../Ref/index.js";
import * as T from "./effect.js";
import type { State } from "./state.js";
import { Acquisition } from "./state.js";
/**
 * An asynchronous semaphore, which is a generalization of a mutex. Semaphores
 * have a certain number of permits, which can be held and released
 * concurrently by different parties. Attempts to acquire more permits than
 * available result in the acquiring fiber being suspended until the specified
 * number of permits become available.
 **/
export declare class Semaphore {
    private readonly state;
    constructor(state: R.Ref<State>);
    get available(): T.Effect<unknown, never, number>;
    private loop;
    private releaseN;
    private restore;
    prepare(n: number): T.Effect<unknown, never, Acquisition>;
}
/**
 * Acquires `n` permits, executes the action and releases the permits right after.
 */
export declare function withPermits_<R, E, A>(e: T.Effect<R, E, A>, s: Semaphore, n: number): T.Effect<R, E, A>;
/**
 * Acquires `n` permits, executes the action and releases the permits right after.
 *
 * @ets_data_first withPermits_
 */
export declare function withPermits(s: Semaphore, n: number): <R, E, A>(e: T.Effect<R, E, A>) => T.Effect<R, E, A>;
/**
 * Acquires a permit, executes the action and releases the permit right after.
 */
export declare function withPermit_<R, E, A>(self: T.Effect<R, E, A>, s: Semaphore): T.Effect<R, E, A>;
/**
 * Acquires a permit, executes the action and releases the permit right after.
 *
 * @ets_data_first withPermit_
 */
export declare function withPermit(s: Semaphore): <R, E, A>(self: T.Effect<R, E, A>) => T.Effect<R, E, A>;
/**
 * Acquires `n` permits in a `Managed` and releases the permits in the finalizer.
 */
export declare function withPermitsManaged(s: Semaphore, n: number): import("../Managed/managed.js").Managed<unknown, never, void>;
/**
 * Acquires a permit in a `Managed` and releases the permit in the finalizer.
 */
export declare function withPermitManaged(s: Semaphore): import("../Managed/managed.js").Managed<unknown, never, void>;
/**
 * The number of permits currently available.
 */
export declare function available(s: Semaphore): T.Effect<unknown, never, number>;
/**
 * Creates a new `Sempahore` with the specified number of permits.
 */
export declare function makeSemaphore(permits: number): T.Effect<unknown, never, Semaphore>;
/**
 * Creates a new `Sempahore` with the specified number of permits.
 */
export declare function unsafeMakeSemaphore(permits: number): Semaphore;
//# sourceMappingURL=semaphore.d.ts.map