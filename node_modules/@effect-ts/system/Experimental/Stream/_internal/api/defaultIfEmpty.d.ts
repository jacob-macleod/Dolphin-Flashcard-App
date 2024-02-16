import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as C from "../core.js";
export declare function defaultIfEmpty_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, stream: C.Stream<R1, E1, A1>): C.Stream<R & R1, E | E1, A | A1>;
export declare function defaultIfEmpty_<R, E, A, A1>(self: C.Stream<R, E, A>, chunk: CK.Chunk<A1>): C.Stream<R, E, A | A1>;
export declare function defaultIfEmpty_<R, E, A, A1>(self: C.Stream<R, E, A>, a: A1): C.Stream<R, E, A | A1>;
/**
 * @ets_data_first defaultIfEmpty_
 */
export declare function defaultIfEmpty<R, R1, E, E1, A, A1>(stream: C.Stream<R1, E1, A1>): (self: C.Stream<R, E, A>) => C.Stream<R & R1, E | E1, A | A1>;
export declare function defaultIfEmpty<R, E, A, A1>(chunk: CK.Chunk<A1>): (self: C.Stream<R, E, A>) => C.Stream<R, E, A | A1>;
export declare function defaultIfEmpty<R, E, A, A1>(a: A1): (self: C.Stream<R, E, A>) => C.Stream<R, E, A | A1>;
//# sourceMappingURL=defaultIfEmpty.d.ts.map