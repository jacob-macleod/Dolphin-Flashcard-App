import type { Effect } from "../../../../Effect/effect.js";
import * as List from "../core.js";
/**
 * Effectfully maps the elements of this list.
 */
export declare function mapM_<A, R, E, B>(self: List.List<A>, f: (a: A) => Effect<R, E, B>): Effect<R, E, List.List<B>>;
/**
 * Effectfully maps the elements of this list.
 *
 * @ets_data_first mapM_
 */
export declare function mapM<A, R, E, B>(f: (a: A) => Effect<R, E, B>): (self: List.List<A>) => Effect<R, E, List.List<B>>;
//# sourceMappingURL=mapM.d.ts.map