import * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from an effect producing a value of type `A`
 */
export declare function effect<R, E, A>(self: T.Effect<R, E, A>): C.Stream<R, E, A>;
//# sourceMappingURL=effect.d.ts.map