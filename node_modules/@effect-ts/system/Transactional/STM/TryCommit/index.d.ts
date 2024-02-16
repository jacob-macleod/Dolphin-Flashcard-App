import "../../../Operator/index.js";
import type * as T from "../../../Effect/index.js";
import type { Journal } from "../Journal/index.js";
export declare type TryCommit<E, A> = Done<E, A> | Suspend;
export declare const DoneTypeId: unique symbol;
export declare type DoneTypeId = typeof DoneTypeId;
export declare class Done<E, A> {
    readonly io: T.IO<E, A>;
    readonly _typeId: DoneTypeId;
    constructor(io: T.IO<E, A>);
}
export declare const SuspendTypeId: unique symbol;
export declare type SuspendTypeId = typeof SuspendTypeId;
export declare class Suspend {
    readonly journal: Journal;
    readonly _typeId: SuspendTypeId;
    constructor(journal: Journal);
}
//# sourceMappingURL=index.d.ts.map