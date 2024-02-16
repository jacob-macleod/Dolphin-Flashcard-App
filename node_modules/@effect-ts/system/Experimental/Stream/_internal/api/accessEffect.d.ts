import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Accesses the environment of the stream in the context of an effect.
 */
export declare function accessEffect<R, R1, E, A>(f: (r: R) => T.Effect<R1, E, A>): C.Stream<R & R1, E, A>;
//# sourceMappingURL=accessEffect.d.ts.map