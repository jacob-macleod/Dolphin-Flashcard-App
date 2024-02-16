import "../../../Operator/index.js";
import type { Atomic } from "../../TRef/index.js";
import { Versioned } from "../Versioned/index.js";
export declare const EntryTypeId: unique symbol;
export declare type EntryTypeId = typeof EntryTypeId;
export declare class Entry {
    readonly use: <X>(f: <S>(entry: EntryOps<S>) => X) => X;
    readonly _typeId: EntryTypeId;
    constructor(use: <X>(f: <S>(entry: EntryOps<S>) => X) => X);
}
export declare function makeEntry<A0>(tref0: Atomic<A0>, isNew0: boolean): Entry;
export declare const EntryOpsTypeId: unique symbol;
export declare type EntryOpsTypeId = typeof EntryOpsTypeId;
export declare class EntryOps<S> {
    readonly _typeId: EntryOpsTypeId;
    readonly tref: Atomic<S>;
    readonly expected: Versioned<S>;
    newValue: S;
    readonly isNew: boolean;
    _isChanged: boolean;
    constructor(tref: Atomic<S>, expected: Versioned<S>, newValue: S, isNew: boolean, isChanged: boolean);
    unsafeSet(value: unknown): void;
    unsafeGet<B>(): B;
    commit(): void;
    copy(): Entry;
    isInvalid(): boolean;
    isValid(): boolean;
    isChanged(): boolean;
    toString(): string;
}
//# sourceMappingURL=index.d.ts.map