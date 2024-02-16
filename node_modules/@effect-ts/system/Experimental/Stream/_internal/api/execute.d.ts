import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream that executes the specified effect but emits no elements.
 */
export declare function execute<R, E, Z>(effect: T.Effect<R, E, Z>): C.Stream<R, E, never>;
//# sourceMappingURL=execute.d.ts.map