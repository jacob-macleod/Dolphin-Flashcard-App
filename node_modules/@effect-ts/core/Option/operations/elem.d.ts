import * as O from "@effect-ts/system/Option";
import type { Equal } from "../../Equal/index.js";
/**
 * Returns `true` if `ma` contains `a`
 *
 * @ets_data_first elem_
 */
export declare function elem<A>(E: Equal<A>): (a: A) => (ma: O.Option<A>) => boolean;
/**
 * Returns `true` if `ma` contains `a`
 */
export declare function elem_<A>(E: Equal<A>): (ma: O.Option<A>, a: A) => boolean;
//# sourceMappingURL=elem.d.ts.map