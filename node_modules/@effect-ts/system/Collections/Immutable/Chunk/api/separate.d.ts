import type * as E from "../../../../Either/index.js";
import type * as Tp from "../../Tuple/index.js";
import type * as Chunk from "../core.js";
/**
 * Partitions the elements of this chunk into two chunks
 */
export declare function separate<B, C>(self: Chunk.Chunk<E.Either<B, C>>): Tp.Tuple<[Chunk.Chunk<B>, Chunk.Chunk<C>]>;
//# sourceMappingURL=separate.d.ts.map