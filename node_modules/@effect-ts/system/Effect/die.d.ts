/**
 * Returns an effect that dies with the specified `unknown`.
 * This method can be used for terminating a fiber because a defect has been
 * detected in the code.
 */
export declare function die(e: unknown, __trace?: string): import("./effect.js").IO<never, never>;
/**
 * Returns an effect that dies with the specified `unknown`.
 * This method can be used for terminating a fiber because a defect has been
 * detected in the code.
 */
export declare function dieWith(e: () => unknown, __trace?: string): import("./effect.js").IO<never, never>;
//# sourceMappingURL=die.d.ts.map