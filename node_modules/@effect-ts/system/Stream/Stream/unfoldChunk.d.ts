import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`.
 */
export declare function unfoldChunk<A, S>(s: S, f: (s: S) => O.Option<Tp.Tuple<[A.Chunk<A>, S]>>): Stream<unknown, never, A>;
//# sourceMappingURL=unfoldChunk.d.ts.map