import type { Either } from "@effect-ts/system/Either";
import type { Show } from "../../Show/index.js";
/**
 * Get `Show` for `Either` given `Show` of `E` & `A`
 */
export declare function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>>;
//# sourceMappingURL=getShow.d.ts.map