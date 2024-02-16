import * as A from "../../Collections/Immutable/Chunk/index.js";
import type { Stream } from "./definitions.js";
/**
 * Exposes the underlying chunks of the stream as a stream of chunks of elements
 */
export declare function chunks<R, E, A>(self: Stream<R, E, A>): Stream<R, E, A.Chunk<A>>;
//# sourceMappingURL=chunks.d.ts.map