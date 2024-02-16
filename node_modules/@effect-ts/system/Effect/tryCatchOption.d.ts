import type * as O from "../Option/index.js";
/**
 * Get the A from an option
 */
export default function tryCatchOption_<A, E>(ma: O.Option<A>, onNone: () => E): import("./effect.js").Effect<unknown, E, A>;
/**
 * Get the A from an option
 *
 * @ets_data_first tryCatchOption_
 */
export declare function tryCatchOption<A, E>(onNone: () => E): (ma: O.Option<A>) => import("./effect.js").Effect<unknown, E, A>;
//# sourceMappingURL=tryCatchOption.d.ts.map