import type { FiberID } from "../Fiber/id.js";
import type { AtomicReference } from "../Support/AtomicReference/index.js";
import type { State } from "./state.js";
export declare class Promise<E, A> {
    readonly state: AtomicReference<State<E, A>>;
    readonly blockingOn: readonly FiberID[];
    constructor(state: AtomicReference<State<E, A>>, blockingOn: readonly FiberID[]);
}
//# sourceMappingURL=promise.d.ts.map