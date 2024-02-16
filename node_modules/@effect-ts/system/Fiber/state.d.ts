import * as C from "../Cause/index.js";
import type * as Exit from "../Exit/index.js";
import type { Status } from "./status.js";
export declare type FiberState<E, A> = FiberStateExecuting<E, A> | FiberStateDone<E, A>;
export declare type Callback<E, A> = (exit: Exit.Exit<E, A>) => void;
export declare class FiberStateExecuting<E, A> {
    readonly status: Status;
    readonly observers: Callback<never, Exit.Exit<E, A>>[];
    readonly interrupted: C.Cause<never>;
    readonly _tag = "Executing";
    constructor(status: Status, observers: Callback<never, Exit.Exit<E, A>>[], interrupted: C.Cause<never>);
}
export declare class FiberStateDone<E, A> {
    readonly value: Exit.Exit<E, A>;
    readonly _tag = "Done";
    readonly interrupted: C.Cause<never>;
    readonly status: Status;
    constructor(value: Exit.Exit<E, A>);
}
export declare function initial<E, A>(): FiberState<E, A>;
export declare function interrupting<E, A>(state: FiberState<E, A>): boolean;
//# sourceMappingURL=state.d.ts.map