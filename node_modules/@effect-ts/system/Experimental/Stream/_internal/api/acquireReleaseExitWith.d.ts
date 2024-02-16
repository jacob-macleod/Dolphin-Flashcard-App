import type * as T from "../../../../Effect/index.js";
import type * as Ex from "../../../../Exit/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */
export declare function acquireReleaseExitWith_<R, E, A, Z>(acquire: T.Effect<R, E, A>, release: (a: A, exit: Ex.Exit<any, any>) => T.RIO<R, Z>): C.Stream<R, E, A>;
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 *
 * @ets_data_first acquireReleaseExitWith_
 */
export declare function acquireReleaseExitWith<R, A, Z>(release: (a: A, exit: Ex.Exit<any, any>) => T.RIO<R, Z>): <E>(acquire: T.Effect<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=acquireReleaseExitWith.d.ts.map