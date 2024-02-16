import type * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Accesses the environment of the stream in the context of an effect.
 */
export declare function accessM<R, E, A>(f: (r: R) => T.Effect<R, E, A>): Stream<R, E, A>;
//# sourceMappingURL=accessM.d.ts.map