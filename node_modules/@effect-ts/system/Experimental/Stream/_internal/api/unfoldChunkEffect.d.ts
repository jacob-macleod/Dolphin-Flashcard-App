import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */
export declare function unfoldChunkEffect<R, E, A, S>(s: S, f: (s: S) => T.Effect<R, E, O.Option<Tp.Tuple<[CK.Chunk<A>, S]>>>): C.Stream<R, E, A>;
//# sourceMappingURL=unfoldChunkEffect.d.ts.map