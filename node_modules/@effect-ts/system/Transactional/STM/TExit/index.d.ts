import "../../../Operator/index.js";
import * as St from "../../../Structural/index.js";
export declare type TExit<A, B> = Fail<A> | Succeed<B> | Retry | Die;
export declare const FailTypeId: unique symbol;
export declare type FailTypeId = typeof FailTypeId;
export declare class Fail<A> {
    readonly value: A;
    readonly _typeId: FailTypeId;
    constructor(value: A);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare const DieTypeId: unique symbol;
export declare type DieTypeId = typeof DieTypeId;
export declare class Die {
    readonly value: unknown;
    readonly _typeId: DieTypeId;
    constructor(value: unknown);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare const SucceedTypeId: unique symbol;
export declare type SucceedTypeId = typeof SucceedTypeId;
export declare class Succeed<B> {
    readonly value: B;
    readonly _typeId: SucceedTypeId;
    constructor(value: B);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare const RetryTypeId: unique symbol;
export declare type RetryTypeId = typeof RetryTypeId;
export declare class Retry {
    readonly _typeId: RetryTypeId;
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare const unit: TExit<never, void>;
export declare function succeed<A>(a: A): TExit<never, A>;
export declare function fail<E>(e: E): TExit<E, never>;
export declare function die(e: unknown): TExit<never, never>;
export declare const retry: TExit<never, never>;
//# sourceMappingURL=index.d.ts.map