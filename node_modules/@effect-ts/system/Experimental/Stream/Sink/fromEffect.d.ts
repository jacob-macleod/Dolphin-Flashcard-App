import type * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * Creates a single-value sink produced from an effect
 */
export declare function fromEffect<R, E, Z>(b: T.Effect<R, E, Z>): C.Sink<R, unknown, unknown, E, unknown, Z>;
//# sourceMappingURL=fromEffect.d.ts.map