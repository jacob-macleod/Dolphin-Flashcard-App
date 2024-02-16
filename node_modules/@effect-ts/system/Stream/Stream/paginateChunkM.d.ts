import * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Like `unfoldChunkM`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */
export declare function paginateChunkM<S, R, E, A>(s: S, f: (s: S) => T.Effect<R, E, Tp.Tuple<[A.Chunk<A>, O.Option<S>]>>): Stream<R, E, A>;
//# sourceMappingURL=paginateChunkM.d.ts.map