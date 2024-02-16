import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Terminates the stream when encountering the first `None`.
 */
export declare function collectWhileSome<R, E, A1>(self: C.Stream<R, E, O.Option<A1>>): C.Stream<R, E, A1>;
//# sourceMappingURL=collectWhileSome.d.ts.map