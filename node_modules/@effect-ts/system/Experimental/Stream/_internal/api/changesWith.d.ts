import type * as EQ from "../../../../Equal/index.js";
import * as C from "../core.js";
/**
 * Returns a new stream that only emits elements that are not equal to the
 * previous element emitted, using the specified function to determine
 * whether two elements are equal.
 */
export declare function changesWith_<R, E, A>(self: C.Stream<R, E, A>, equal: EQ.Equal<A>): C.Stream<R, E, A>;
/**
 * Returns a new stream that only emits elements that are not equal to the
 * previous element emitted, using the specified function to determine
 * whether two elements are equal.
 *
 * @ets_data_first changesWith_
 */
export declare function changesWith<A>(equal: EQ.Equal<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=changesWith.d.ts.map