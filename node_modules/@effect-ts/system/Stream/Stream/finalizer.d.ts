import * as T from "../_internal/effect.js";
import type { RIO } from "./definitions.js";
/**
 * Creates a one-element stream that never fails and executes the finalizer when it ends.
 */
export declare function finalizer<R>(finalizer: T.RIO<R, unknown>): RIO<R, unknown>;
//# sourceMappingURL=finalizer.d.ts.map