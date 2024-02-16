import * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as O from "../../Option/index.js";
/**
 * Like `unfoldChunk`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */
export declare function paginateChunk<S, A>(s: S, f: (s: S) => Tp.Tuple<[A.Chunk<A>, O.Option<S>]>): import("./definitions.js").Stream<unknown, never, A>;
//# sourceMappingURL=paginateChunk.d.ts.map