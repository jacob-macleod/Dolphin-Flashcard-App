import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Effect } from "./effect.js";
/**
 * Parallely zips this effects
 */
export declare function zipPar_<R, E, A, R2, E2, A2>(a: Effect<R, E, A>, b: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, Tp.Tuple<[A, A2]>>;
/**
 * Parallely zips this effects
 */
export declare function zipPar<R2, E2, A2>(b: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(a: Effect<R, E, A>) => Effect<R & R2, E2 | E, Tp.Tuple<[A, A2]>>;
//# sourceMappingURL=zipPar.d.ts.map