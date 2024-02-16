import type * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from an iterable collection of values
 */
export declare function fromIterableM<R, E, O>(iterable: T.Effect<R, E, Iterable<O>>): Stream<R, E, O>;
//# sourceMappingURL=fromIterableM.d.ts.map