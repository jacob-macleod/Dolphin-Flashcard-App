import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from an effect producing a value of type `A` which repeats forever.
 */
export declare function repeatEffect<R, E, A>(fa: T.Effect<R, E, A>): Stream<R, E, A>;
//# sourceMappingURL=repeatEffect.d.ts.map