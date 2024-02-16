import type { Either } from "@effect-ts/system/Either";
import type { Associative } from "../../Associative/index.js";
/**
 * Get `Associative` for `Either` given `Associative` of `A`
 */
export declare function getAssociative<E, A>(S: Associative<A>): Associative<Either<E, A>>;
//# sourceMappingURL=getAssociative.d.ts.map