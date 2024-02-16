import type * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Terminates the stream when encountering the first `None`.
 */
export declare function collectWhileSome<R, E, O1>(self: Stream<R, E, O.Option<O1>>): Stream<R, E, O1>;
//# sourceMappingURL=collectWhileSome.d.ts.map