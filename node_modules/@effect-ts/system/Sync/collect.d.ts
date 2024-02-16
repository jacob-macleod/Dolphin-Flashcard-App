import type { Chunk } from "../Collections/Immutable/Chunk/core.js";
import type { Option } from "../Option/index.js";
import type { Sync } from "./core.js";
/**
 * Evaluate each sync in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */
export declare function collect<A, R, E, B>(f: (a: A) => Sync<R, Option<E>, B>): (self: Iterable<A>) => Sync<R, E, Chunk<B>>;
/**
 * Evaluate each Sync in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */
export declare function collect_<A, R, E, B>(self: Iterable<A>, f: (a: A) => Sync<R, Option<E>, B>): Sync<R, E, Chunk<B>>;
//# sourceMappingURL=collect.d.ts.map