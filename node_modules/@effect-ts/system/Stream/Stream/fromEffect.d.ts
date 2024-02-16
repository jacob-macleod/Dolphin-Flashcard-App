import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from an effect producing a value of type `A`
 */
export declare function fromEffect<R, E, A>(fa: T.Effect<R, E, A>): Stream<R, E, A>;
//# sourceMappingURL=fromEffect.d.ts.map