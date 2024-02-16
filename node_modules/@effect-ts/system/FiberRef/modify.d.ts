import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as T from "./excl-effect.js";
import type { XFiberRef } from "./fiberRef.js";
/**
 * Atomically modifies the `FiberRef` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 *
 * @ets_data_first modify_
 */
export declare function modify<A, B>(f: (a: A) => Tp.Tuple<[B, A]>): <EA, EB>(fiberRef: XFiberRef<EA, EB, A, A>) => T.IO<EA | EB, B>;
/**
 * Atomically modifies the `FiberRef` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */
export declare function modify_<EA, EB, A, B>(fiberRef: XFiberRef<EA, EB, A, A>, f: (a: A) => Tp.Tuple<[B, A]>): T.IO<EA | EB, B>;
//# sourceMappingURL=modify.d.ts.map