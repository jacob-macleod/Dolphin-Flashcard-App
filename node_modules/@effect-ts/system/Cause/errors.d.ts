import type { Cause } from "./cause.js";
export declare const FiberFailureSymbol: unique symbol;
export declare class FiberFailure<E> extends Error {
    readonly cause: Cause<E>;
    readonly [FiberFailureSymbol] = "FiberFailure";
    readonly pretty: string;
    constructor(cause: Cause<E>);
}
export declare const isFiberFailure: (u: unknown) => u is FiberFailure<unknown>;
export declare const UntracedSymbol: unique symbol;
export declare class Untraced extends Error {
    readonly [UntracedSymbol] = "Untraced";
    constructor(message?: string);
}
export declare const isUntraced: (u: unknown) => u is Untraced;
export declare const RuntimeSymbol: unique symbol;
export declare class RuntimeError {
    readonly message?: string | undefined;
    readonly [RuntimeSymbol] = "RuntimeError";
    constructor(message?: string | undefined);
}
export declare const isRuntime: (u: unknown) => u is RuntimeError;
export declare const InterruptedSymbol: unique symbol;
export declare class InterruptedException extends Error {
    readonly [InterruptedSymbol] = "InterruptedException";
    constructor(message?: string);
}
export declare const isInterruptedException: (u: unknown) => u is InterruptedException;
export declare const IllegalStateSymbol: unique symbol;
export declare class IllegalStateException extends Error {
    readonly [IllegalStateSymbol] = "IllegalStateException";
    constructor(message?: string);
}
export declare const isIllegalStateException: (u: unknown) => u is IllegalStateException;
export declare const IllegalArgumentSymbol: unique symbol;
export declare class IllegalArgumentException extends Error {
    readonly [IllegalArgumentSymbol] = "IllegalArgumentException";
    constructor(message?: string);
}
export declare const isIllegalArgumentException: (u: unknown) => u is IllegalArgumentException;
//# sourceMappingURL=errors.d.ts.map