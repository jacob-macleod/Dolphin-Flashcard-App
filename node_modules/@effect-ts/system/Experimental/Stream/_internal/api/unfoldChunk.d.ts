import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`.
 */
export declare function unfoldChunk<S, A>(s: S, f: (s: S) => O.Option<Tp.Tuple<[CK.Chunk<A>, S]>>): C.UIO<A>;
//# sourceMappingURL=unfoldChunk.d.ts.map