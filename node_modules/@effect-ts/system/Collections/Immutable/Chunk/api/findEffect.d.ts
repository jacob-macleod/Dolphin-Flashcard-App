import * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import type * as Chunk from "../core.js";
/**
 * Returns the first element that satisfies the effectful predicate.
 */
export declare function findEffect_<R, E, A>(self: Chunk.Chunk<A>, f: (a: A) => T.Effect<R, E, boolean>): T.Effect<R, E, O.Option<A>>;
/**
 * Returns the first element that satisfies the effectful predicate.
 *
 * @ets_data_first findEffect_
 */
export declare function findEffect<R, E, A>(f: (a: A) => T.Effect<R, E, boolean>): (self: Chunk.Chunk<A>) => T.Effect<R, E, O.Option<A>>;
//# sourceMappingURL=findEffect.d.ts.map