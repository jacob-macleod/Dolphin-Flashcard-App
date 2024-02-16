import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */
export declare function runForEachWhile_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, boolean>): T.Effect<R & R1, E | E1, void>;
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 *
 * @ets_data_first runForEachWhile_
 */
export declare function runForEachWhile<R1, E1, A>(f: (a: A) => T.Effect<R1, E1, boolean>): <R, E>(self: C.Stream<R, E, A>) => T.Effect<R & R1, E1 | E, void>;
//# sourceMappingURL=runForEachWhile.d.ts.map