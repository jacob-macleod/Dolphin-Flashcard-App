import * as E from "../Either/core.js";
import type { UIO } from "./effect.js";
/**
 * Returns an effect with the value on the left part.
 */
export declare function toLeftWith<A>(a: () => A, __trace?: string): UIO<E.Either<A, never>>;
/**
 * Returns an effect with the value on the left part.
 */
export declare function toLeft<A>(a: A, __trace?: string): UIO<E.Either<A, never>>;
//# sourceMappingURL=toLeft.d.ts.map