import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Stream } from "./definitions.js";
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zip_<R, R1, E, E1, O, O2>(self: Stream<R, E, O>, that: Stream<R1, E1, O2>): Stream<R & R1, E | E1, Tp.Tuple<[O, O2]>>;
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 */
export declare function zip<R1, E1, O2>(that: Stream<R1, E1, O2>): <R, E, O>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, Tp.Tuple<[O, O2]>>;
//# sourceMappingURL=zip.d.ts.map