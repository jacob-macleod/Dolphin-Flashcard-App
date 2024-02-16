import "../../../Operator/index.js";
export declare const VersionedTypeId: unique symbol;
export declare type VersionedTypeId = typeof VersionedTypeId;
export declare class Versioned<A> {
    readonly value: A;
    readonly _typeId: VersionedTypeId;
    constructor(value: A);
}
//# sourceMappingURL=index.d.ts.map