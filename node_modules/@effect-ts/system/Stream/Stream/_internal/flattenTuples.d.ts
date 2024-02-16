import * as Chunk from "../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
declare type RecursiveTuples<T> = Tp.Tuple<[T | RecursiveTuples<T>, T]>;
export declare function flattenTuples<T>(tuples: RecursiveTuples<T>): Chunk.Chunk<T>;
export {};
//# sourceMappingURL=flattenTuples.d.ts.map