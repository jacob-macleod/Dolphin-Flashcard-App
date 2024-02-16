import type * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream that executes the specified effect but emits no elements.
 */
export declare function execute<R, E, Z>(effect: T.Effect<R, E, Z>): Stream<R, E, never>;
//# sourceMappingURL=execute.d.ts.map