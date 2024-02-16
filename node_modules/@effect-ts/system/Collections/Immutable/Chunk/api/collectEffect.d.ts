import type { Effect } from "../../../../Effect/effect.js";
import * as O from "../../../../Option/index.js";
import * as Chunk from "../core.js";
/**
 * Returns a filtered, mapped subset of the elements of this chunk based on a .
 */
export declare function collectEffect_<A, R, E, B>(self: Chunk.Chunk<A>, f: (a: A) => O.Option<Effect<R, E, B>>): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Returns a filtered, mapped subset of the elements of this chunk based on a .
 *
 * @ets_data_first collectEffect_
 */
export declare function collectEffect<A, R, E, B>(f: (a: A) => O.Option<Effect<R, E, B>>): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<B>>;
//# sourceMappingURL=collectEffect.d.ts.map