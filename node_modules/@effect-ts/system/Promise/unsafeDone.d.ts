import type { IO } from "../Effect/effect.js";
import type { Promise } from "./promise.js";
/**
 * Unsafe version of done
 */
export declare function unsafeDone<E, A>(io: IO<E, A>): (promise: Promise<E, A>) => void;
//# sourceMappingURL=unsafeDone.d.ts.map