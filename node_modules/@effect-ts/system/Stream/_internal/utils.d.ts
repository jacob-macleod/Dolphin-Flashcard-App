import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as E from "../../Either/index.js";
export declare function zipChunks_<A, B, C>(fa: A.Chunk<A>, fb: A.Chunk<B>, f: (a: A, b: B) => C): [A.Chunk<C>, E.Either<A.Chunk<A>, A.Chunk<B>>];
//# sourceMappingURL=utils.d.ts.map