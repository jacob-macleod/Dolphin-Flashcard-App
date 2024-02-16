import * as O from "../../Option/index.js";
import * as T from "../deps-core.js";
import type { Finalizer } from "./finalizer.js";
import type { ReleaseMap } from "./ReleaseMap.js";
export declare function addIfOpen(finalizer: Finalizer): (_: ReleaseMap) => T.Effect<unknown, never, O.Option<number>>;
//# sourceMappingURL=addIfOpen.d.ts.map