import * as HM from "../../../Collections/Immutable/HashMap/index.js";
import type * as C from "./core.js";
/**
 * A sink that collects first `n` keys into a map. The keys are calculated
 * from inputs using the keying function `key`; if multiple inputs use the
 * the same key, they are merged using the `f` function.
 */
export declare function collectAllToMapN<Err, In, K>(n: number, key: (in_: In) => K, f: (in1: In, in2: In) => In): C.Sink<unknown, Err, In, Err, In, HM.HashMap<K, In>>;
//# sourceMappingURL=collectAllToMapN.d.ts.map