import type { Canceler } from "../Effect/Canceler.js";
import type { IO } from "../Effect/effect.js";
import type { Promise } from "./promise.js";
export declare function interruptJoiner<E, A>(joiner: (a: IO<E, A>) => void): (promise: Promise<E, A>) => Canceler<unknown>;
//# sourceMappingURL=interruptJoiner.d.ts.map