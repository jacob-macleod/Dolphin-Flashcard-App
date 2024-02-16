import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */
export declare function acquireReleaseWith_<R, E, A, Z>(acquire: T.Effect<R, E, A>, release: (a: A) => T.RIO<R, Z>): C.Stream<R, E, A>;
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 *
 * @ets_data_first acquireReleaseWith_
 */
export declare function acquireReleaseWith<R, A, Z>(release: (a: A) => T.RIO<R, Z>): <E>(acquire: T.Effect<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=acquireReleaseWith.d.ts.map