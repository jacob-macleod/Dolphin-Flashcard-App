import * as HM from "../../../Collections/Immutable/HashMap/index.js";
import type * as C from "./core.js";
/**
 * A sink that collects all of its inputs into a map. The keys are extracted from inputs
 * using the keying function `key`; if multiple inputs use the same key, they are merged
 * using the `f` function.
 */
export declare function collectAllToMap<Err, In, K>(key: (in_: In) => K, f: (in1: In, in2: In) => In): C.Sink<unknown, Err, In, Err, unknown, HM.HashMap<K, In>>;
//# sourceMappingURL=collectAllToMap.d.ts.map