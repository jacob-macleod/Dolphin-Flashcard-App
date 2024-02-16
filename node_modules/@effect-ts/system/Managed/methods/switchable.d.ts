import * as T from "../deps.js";
import type { Managed } from "../managed.js";
/**
 * Returns a `Managed` value that represents a managed resource that can
 * be safely swapped within the scope of the `Managed`. The function provided
 * inside the `Managed` can be used to switch the resource currently in use.
 *
 * When the resource is switched, the finalizer for the previous finalizer will
 * be executed uninterruptibly. If the effect executing inside the `use`
 * is interrupted, the finalizer for the resource currently in use is guaranteed
 * to execute.
 *
 * This constructor can be used to create an expressive control flow that uses
 * several instances of a managed resource.
 */
export declare function switchable<R, E, A>(__trace?: string): Managed<R, never, (x: Managed<R, E, A>) => T.Effect<R, E, A>>;
//# sourceMappingURL=switchable.d.ts.map