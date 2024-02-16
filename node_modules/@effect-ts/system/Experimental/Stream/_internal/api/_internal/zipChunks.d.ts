import * as A from "../../../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../../../Collections/Immutable/Tuple/index.js";
import * as E from "../../../../../Either/index.js";
export declare function zipChunks_<A, B, C>(fa: A.Chunk<A>, fb: A.Chunk<B>, f: (a: A, b: B) => C): Tp.Tuple<[A.Chunk<C>, E.Either<A.Chunk<A>, A.Chunk<B>>]>;
//# sourceMappingURL=zipChunks.d.ts.map