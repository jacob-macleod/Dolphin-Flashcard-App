import type { Cause } from "../../Cause/index.js";
import type { Trace } from "../../Fiber/tracing.js";
/**
 * Returns an effect that models failure with the specified `Cause`.
 */
export declare function halt<E>(self: Cause<E>, __trace?: string): import("../managed.js").Managed<unknown, E, never>;
/**
 * Returns an effect that models failure with the specified `Cause`.
 */
export declare function haltWith<E>(self: (_: () => Trace) => Cause<E>, __trace?: string): import("../managed.js").Managed<unknown, E, never>;
//# sourceMappingURL=halt.d.ts.map