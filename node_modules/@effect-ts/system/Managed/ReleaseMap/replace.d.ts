import * as O from "../../Option/index.js";
import * as T from "../deps.js";
import type { Finalizer } from "./finalizer.js";
import type { ReleaseMap } from "./ReleaseMap.js";
export declare function replace(key: number, finalizer: Finalizer): (_: ReleaseMap) => T.Effect<unknown, never, O.Option<Finalizer>>;
//# sourceMappingURL=replace.d.ts.map