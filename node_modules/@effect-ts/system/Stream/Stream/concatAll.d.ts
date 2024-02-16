import * as A from "../../Collections/Immutable/Chunk/index.js";
import { Stream } from "./definitions.js";
/**
 * Concatenates all of the streams in the chunk to one stream.
 */
export declare function concatAll<R, E, O>(streams: A.Chunk<Stream<R, E, O>>): Stream<R, E, O>;
//# sourceMappingURL=concatAll.d.ts.map