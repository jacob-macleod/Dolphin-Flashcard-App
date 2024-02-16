import type { Either } from "@effect-ts/system/Either";
import type { Identity } from "../../Identity/index.js";
import type { Option } from "../../Option/index.js";
import * as P from "../../Prelude/index.js";
/**
 * Compact `Either<E, Option<A>>` given `Identity<E>`
 */
export declare function compactOption<E>(M: Identity<E>): <A>(ma: Either<E, Option<A>>) => Either<E, A>;
/**
 * Get `Witherable`'s `compactF` given `Identity<E>`
 */
export declare function getCompactF<E>(M: Identity<E>): P.Wither<[P.URI<"Either", {}>], P.Fix<"E", E>>;
/**
 * Get `Compact` instance given `Identity<E>`
 */
export declare function getCompact<E>(M: Identity<E>): P.Compact<[P.URI<"Either", {}>], P.Fix<"E", E>>;
//# sourceMappingURL=compactOption.d.ts.map