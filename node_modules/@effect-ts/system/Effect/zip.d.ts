import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Effect } from "./effect.js";
/**
 * Sequentially zips this effect with the specified effect
 *
 * @ets_data_first zip_
 */
export declare function zip<R2, E2, A2>(b: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(a: Effect<R, E, A>) => Effect<R & R2, E2 | E, Tp.Tuple<[A, A2]>>;
/**
 * Sequentially zips this effect with the specified effect
 */
export declare function zip_<R, E, A, R2, E2, A2>(a: Effect<R, E, A>, b: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, Tp.Tuple<[A, A2]>>;
//# sourceMappingURL=zip.d.ts.map