import type * as C from "../Cause/index.js";
import * as St from "../Structural/index.js";
export declare type Exit<E, A> = Success<A> | Failure<E>;
export declare class Success<A> implements St.HasEquals {
    readonly value: A;
    readonly _tag = "Success";
    constructor(value: A);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare class Failure<E> {
    readonly cause: C.Cause<E>;
    readonly _tag = "Failure";
    constructor(cause: C.Cause<E>);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
//# sourceMappingURL=exit.d.ts.map