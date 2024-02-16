import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Performs a filter and map in a single step.
 */
export declare function collect_<R, E, A, B>(self: C.Stream<R, E, A>, f: (a: A) => O.Option<B>): C.Stream<R, E, B>;
/**
 * Performs a filter and map in a single step.
 *
 * @ets_data_first collect_
 */
export declare function collect<A, B>(f: (a: A) => O.Option<B>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, B>;
//# sourceMappingURL=collect.d.ts.map