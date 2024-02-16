import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from an effect producing a value of type `Iterable[A]`
 */
export declare function fromIterableEffect<R, E, O>(iterable: T.Effect<R, E, Iterable<O>>): C.Stream<R, E, O>;
//# sourceMappingURL=fromIterableEffect.d.ts.map