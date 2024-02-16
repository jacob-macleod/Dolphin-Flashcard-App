import * as E from "@effect-ts/system/Either";
import type { Associative } from "../../Associative/index.js";
/**
 * Zip combining errors in case of multiple failures
 */
export declare function zipValidation<E>(A: Associative<E>): <B>(fb: E.Either<E, B>) => <A>(fa: E.Either<E, A>) => E.Either<E, readonly [A, B]>;
//# sourceMappingURL=zipValidation.d.ts.map