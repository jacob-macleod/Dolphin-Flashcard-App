import type { FiberID } from "../../../Fiber/index.js";
import type { Journal } from "../Journal/index.js";
import * as TExit from "../TExit/index.js";
import * as STM from "./primitives.js";
export declare class STMDriver<R, E, A> {
    readonly self: STM.STM<R, E, A>;
    readonly journal: Journal;
    readonly fiberId: FiberID;
    private contStack;
    private envStack;
    constructor(self: STM.STM<R, E, A>, journal: Journal, fiberId: FiberID, r0: R);
    private unwindStack;
    run(): TExit.TExit<E, A>;
}
//# sourceMappingURL=driver.d.ts.map