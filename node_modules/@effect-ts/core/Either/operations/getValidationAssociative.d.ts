import type { Either } from "@effect-ts/system/Either";
import type { Associative } from "../../Associative/index.js";
/**
 * Get an `Associative` instance for `Either` that combines both success and failure
 * given `Associative` of `A` & `E`.
 */
export declare function getValidationAssociative<E, A>(SE: Associative<E>, SA: Associative<A>): Associative<Either<E, A>>;
//# sourceMappingURL=getValidationAssociative.d.ts.map