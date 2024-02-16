import * as R from "../../Effect/runtime.js";
import type { Managed } from "../managed.js";
/**
 * Returns an Managed that accesses the runtime, which can be used to
 * (unsafely) execute tasks. This is useful for integration with legacy
 * code that must call back into Effect code.
 */
export declare function runtime<R>(__trace?: string): Managed<R, never, R.CustomRuntime<R, unknown>>;
//# sourceMappingURL=runtime.d.ts.map