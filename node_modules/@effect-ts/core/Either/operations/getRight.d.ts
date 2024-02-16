import type { Either } from "@effect-ts/system/Either";
import * as O from "../../Option/index.js";
/**
 * Gets Right as Option
 */
export declare function getRight<E, A>(self: Either<E, A>): O.Option<A>;
/**
 * Gets Right
 */
export declare function unsafeGetRight<E, A>(self: Either<E, A>): A | undefined;
//# sourceMappingURL=getRight.d.ts.map