import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseOptional_<R, R1, E, E1, A, A1>(self: C.Stream<R, O.Option<E>, A>, that: C.Stream<R1, O.Option<E1>, A1>): C.Stream<R & R1, O.Option<E | E1>, A | A1>;
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 *
 * @ets_data_first orElseOptional_
 */
export declare function orElseOptional<R1, E1, A1>(that: C.Stream<R1, O.Option<E1>, A1>): <R, E, A>(self: C.Stream<R, O.Option<E>, A>) => C.Stream<R & R1, O.Option<E1 | E>, A1 | A>;
//# sourceMappingURL=orElseOptional.d.ts.map