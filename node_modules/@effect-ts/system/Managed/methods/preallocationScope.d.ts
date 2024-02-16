import * as T from "../deps-core.js";
import type { Managed } from "../managed.js";
/**
 * A scope in which resources can be safely preallocated. Passing a `Managed`
 * to the method will create (inside an effect) a managed resource which
 * is already acquired and cannot fail.
 */
export interface PreallocationScope {
    <R, E, A>(managed: Managed<R, E, A>): T.Effect<R, E, Managed<unknown, never, A>>;
}
/**
 * Creates a scope in which resources can be safely preallocated.
 */
export declare const preallocationScope: Managed<unknown, never, PreallocationScope>;
//# sourceMappingURL=preallocationScope.d.ts.map