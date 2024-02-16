import type * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from an effect producing chunks of `A` values which repeats forever.
 */
export declare function repeatEffectChunk<R, E, A>(fa: T.Effect<R, O.Option<E>, A>): Stream<R, E, A>;
//# sourceMappingURL=repeatEffectChunk.d.ts.map