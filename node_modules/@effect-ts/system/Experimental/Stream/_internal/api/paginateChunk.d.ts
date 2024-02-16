import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Like `unfoldChunk`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */
export declare function paginateChunk<A, S>(s: S, f: (s: S) => Tp.Tuple<[CK.Chunk<A>, O.Option<S>]>): C.UIO<A>;
//# sourceMappingURL=paginateChunk.d.ts.map