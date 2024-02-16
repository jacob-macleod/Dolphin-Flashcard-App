import type * as SK from "../../Sink/index.js";
import * as C from "../core.js";
/**
 * Applies the transducer to the stream and emits its outputs.
 */
export declare function transduce_<R, R1, E, E1, A, Z>(self: C.Stream<R, E, A>, sink: SK.Sink<R1, E, A, E1, A, Z>): C.Stream<R & R1, E1, Z>;
/**
 * Applies the transducer to the stream and emits its outputs.
 *
 * @ets_data_first transduce_
 */
export declare function transduce<R, R1, E, E1, A, Z>(sink: SK.Sink<R1, E, A, E1, A, Z>): (self: C.Stream<R, E, A>) => C.Stream<R & R1, E1, Z>;
//# sourceMappingURL=transduce.d.ts.map