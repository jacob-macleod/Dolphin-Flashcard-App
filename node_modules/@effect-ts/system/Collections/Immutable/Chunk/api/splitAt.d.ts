import * as Tp from "../../Tuple/index.js";
import * as Chunk from "../core.js";
/**
 * Returns two splits of this chunk at the specified index.
 */
export declare function splitAt_<A>(self: Chunk.Chunk<A>, n: number): Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
/**
 * Returns two splits of this chunk at the specified index.
 *
 * @ets_data_first splitAt_
 */
export declare function splitAt(n: number): <A>(self: Chunk.Chunk<A>) => Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
//# sourceMappingURL=splitAt.d.ts.map