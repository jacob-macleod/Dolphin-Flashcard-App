import type { FiberID } from "../Fiber/id.js";
/**
 * Makes a new promise to be completed by the fiber with the specified id.
 */
export declare function makeAs<E, A>(fiberId: FiberID): import("../Effect/effect.js").UIO<import("./promise.js").Promise<E, A>>;
//# sourceMappingURL=makeAs.d.ts.map