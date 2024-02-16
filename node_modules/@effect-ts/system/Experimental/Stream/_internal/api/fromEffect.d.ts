import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from an effect producing a value of type `A`
 */
export declare function fromEffect<R, E, A>(fa: T.Effect<R, E, A>): C.Stream<R, E, A>;
//# sourceMappingURL=fromEffect.d.ts.map