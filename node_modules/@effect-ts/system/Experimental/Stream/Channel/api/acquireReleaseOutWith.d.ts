import type * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
export declare function acquireReleaseOutWith_<Env, OutErr, Acquired, Z>(acquire: T.Effect<Env, OutErr, Acquired>, release: (a: Acquired) => T.RIO<Env, Z>): C.Channel<Env, unknown, unknown, unknown, OutErr, Acquired, void>;
/**
 * @ets_data_first acquireReleaseOutWith_
 */
export declare function acquireReleaseOutWith<Env, Acquired, Z>(release: (a: Acquired) => T.RIO<Env, Z>): <OutErr>(acquire: T.Effect<Env, OutErr, Acquired>) => C.Channel<Env, unknown, unknown, unknown, OutErr, Acquired, void>;
//# sourceMappingURL=acquireReleaseOutWith.d.ts.map