import type { Either } from "@effect-ts/system/Either";
import * as O from "../../Option/index.js";
/**
 * Gets Left
 */
export declare function unsafeGetLeft<E, A>(self: Either<E, A>): E | undefined;
/**
 * Gets Left as Option
 */
export declare function getLeft<E, A>(self: Either<E, A>): O.Option<E>;
//# sourceMappingURL=getLeft.d.ts.map