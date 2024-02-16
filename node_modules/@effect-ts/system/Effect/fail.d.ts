/**
 * Returns an effect that models failure with the specified error.
 * The moral equivalent of `throw` for pure code.
 */
export declare function fail<E>(e: E, __trace?: string): import("./effect.js").IO<E, never>;
/**
 * Returns an effect that models failure with the specified error.
 * The moral equivalent of `throw` for pure code.
 */
export declare function failWith<E>(e: () => E, __trace?: string): import("./effect.js").IO<E, never>;
//# sourceMappingURL=fail.d.ts.map