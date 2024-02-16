import type { UIO } from "./effect.js";
/**
 * Returns an effect that dies with a {@link RuntimeError} having the
 * specified text message. This method can be used for terminating a fiber
 * because a defect has been detected in the code.
 */
export declare function dieMessage(message: string, __trace?: string): UIO<never>;
//# sourceMappingURL=dieMessage.d.ts.map