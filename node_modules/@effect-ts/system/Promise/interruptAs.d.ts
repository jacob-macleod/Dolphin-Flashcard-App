import type { FiberID } from "../Fiber/id.js";
import type { Promise } from "./promise.js";
/**
 * Completes the promise with interruption. This will interrupt all fibers
 * waiting on the value of the promise as by the specified fiber.
 */
export declare function interruptAs(id: FiberID): <E, A>(promise: Promise<E, A>) => import("../Effect/effect.js").UIO<boolean>;
//# sourceMappingURL=interruptAs.d.ts.map