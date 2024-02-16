import * as T from "../deps-core.js";
import type { Finalizer } from "./finalizer.js";
import type { ReleaseMap } from "./ReleaseMap.js";
export declare function add(finalizer: Finalizer): (_: ReleaseMap) => T.Effect<unknown, never, Finalizer>;
//# sourceMappingURL=add.d.ts.map