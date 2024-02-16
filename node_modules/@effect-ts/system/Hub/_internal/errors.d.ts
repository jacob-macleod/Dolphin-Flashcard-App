import "../../Operator/index.js";
export declare const InvalidCapacityErrorSymbol: unique symbol;
export declare class InvalidCapacityError extends Error {
    readonly [InvalidCapacityErrorSymbol] = "InvalidCapacityError";
    constructor(message?: string);
}
export declare function ensureCapacity(capacity: number): asserts capacity;
export declare function isInvalidCapacityError(u: unknown): u is InvalidCapacityError;
//# sourceMappingURL=errors.d.ts.map