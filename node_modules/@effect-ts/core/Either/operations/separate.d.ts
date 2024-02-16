import type { Either } from "@effect-ts/system/Either";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Identity } from "../../Identity/index.js";
import * as P from "../../Prelude/index.js";
/**
 * Separate `Either<E, Either<A, B>>` given `Identity<E>`
 */
export declare function separate<E>(M: Identity<E>): <A, B>(ma: Either<E, Either<A, B>>) => Tp.Tuple<[Either<E, A>, Either<E, B>]>;
/**
 * Get `Wiltable`'s `separateF` given `Identity<E>`
 */
export declare function getSeparateF<E>(M: Identity<E>): P.Wilt<[P.URI<"Either", {}>], P.Fix<"E", E>>;
/**
 * Get `Separate` instance given `Identity<E>`
 */
export declare function getSeparate<E>(M: Identity<E>): P.Separate<[P.URI<"Either", {}>], P.Fix<"E", E>>;
//# sourceMappingURL=separate.d.ts.map