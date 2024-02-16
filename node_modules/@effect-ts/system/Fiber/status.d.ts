import * as St from "../Structural/index.js";
import * as S from "../Sync/index.js";
import type { FiberID } from "./id.js";
export declare type Status = Done | Finishing | Running | Suspended;
export declare class Done implements St.HasEquals {
    readonly _tag = "Done";
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare class Finishing {
    readonly interrupting: boolean;
    readonly _tag = "Finishing";
    constructor(interrupting: boolean);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare class Running {
    readonly interrupting: boolean;
    readonly _tag = "Running";
    constructor(interrupting: boolean);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare class Suspended {
    readonly previous: Status;
    readonly interruptible: boolean;
    readonly epoch: number;
    readonly blockingOn: readonly FiberID[];
    readonly _tag = "Suspended";
    constructor(previous: Status, interruptible: boolean, epoch: number, blockingOn: readonly FiberID[]);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
    eqArr(a: readonly FiberID[], b: readonly FiberID[]): boolean;
}
export declare function isDone(s: Status): boolean;
export declare function withInterruptingSafe(b: boolean): (s: Status) => S.UIO<Status>;
export declare function withInterrupting(b: boolean): (s: Status) => Status;
export declare function toFinishing(s: Status): Status;
export declare function toFinishingSafe(s: Status): S.UIO<Status>;
//# sourceMappingURL=status.d.ts.map