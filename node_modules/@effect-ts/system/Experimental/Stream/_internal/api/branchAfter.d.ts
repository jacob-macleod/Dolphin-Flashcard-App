import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as C from "../core.js";
interface Pipeline<R, R1, E, E1, A, B> {
    (stream: C.Stream<R, E, A>): C.Stream<R1, E1, B>;
}
/**
 * Reads the first n values from the stream and uses them to choose the pipeline that will be
 * used for the remainder of the stream.
 */
export declare function branchAfter_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, n: number, f: (a1: CK.Chunk<A>) => Pipeline<R, R1, E, E1, A, A>): C.Stream<R & R1, E | E1, A>;
/**
 * Reads the first n values from the stream and uses them to choose the pipeline that will be
 * used for the remainder of the stream.
 *
 * @ets_data_first branchAfter_
 */
export declare function branchAfter<R, R1, E, E1, A>(n: number, f: (a1: CK.Chunk<A>) => Pipeline<R, R1, E, E1, A, A>): (self: C.Stream<R, E, A>) => C.Stream<R & R1, E | E1, A>;
export {};
//# sourceMappingURL=branchAfter.d.ts.map