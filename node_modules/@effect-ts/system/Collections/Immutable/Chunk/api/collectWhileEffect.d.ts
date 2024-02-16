import type { Effect } from "../../../../Effect/effect.js";
import * as O from "../../../../Option/index.js";
import * as Chunk from "../core.js";
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 */
export declare function collectWhileEffect_<A, R, E, B>(self: Chunk.Chunk<A>, f: (a: A) => O.Option<Effect<R, E, B>>): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhileEffect_
 */
export declare function collectWhileEffect<A, R, E, B>(f: (a: A) => O.Option<Effect<R, E, B>>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=collectWhileEffect.d.ts.map