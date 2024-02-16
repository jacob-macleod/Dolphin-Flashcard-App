import type { Exit } from "../Exit/exit.js";
import type { Promise } from "./promise.js";
/**
 * Exits the promise with the specified exit, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
export declare function done<E, A>(e: Exit<E, A>): (promise: Promise<E, A>) => import("../Effect/effect.js").UIO<boolean>;
//# sourceMappingURL=done.d.ts.map