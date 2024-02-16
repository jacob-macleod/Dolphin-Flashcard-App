import type * as T from "../../../../Effect/index.js";
import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Runs the stream to completion and yields the last value emitted by it,
 * discarding the rest of the elements.
 */
export declare function runLast<R, E, A>(self: C.Stream<R, E, A>): T.Effect<R, E, O.Option<A>>;
//# sourceMappingURL=runLast.d.ts.map