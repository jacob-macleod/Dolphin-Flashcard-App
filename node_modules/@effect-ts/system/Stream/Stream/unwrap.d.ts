import type { Effect } from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream produced from an effect
 */
export declare function unwrap<R, E, A>(fa: Effect<R, E, Stream<R, E, A>>): Stream<R, E, A>;
//# sourceMappingURL=unwrap.d.ts.map