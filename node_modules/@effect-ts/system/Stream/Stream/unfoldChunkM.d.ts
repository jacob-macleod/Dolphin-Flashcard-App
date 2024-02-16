import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */
export declare function unfoldChunkM<R, E, A, Z>(z: Z, f: (z: Z) => T.Effect<R, E, O.Option<Tp.Tuple<[A.Chunk<A>, Z]>>>): Stream<R, E, A>;
//# sourceMappingURL=unfoldChunkM.d.ts.map