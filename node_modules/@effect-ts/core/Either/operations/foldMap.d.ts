import type { Either } from "@effect-ts/system/Either";
import * as E from "@effect-ts/system/Either";
import type { Identity } from "../../Identity/index.js";
/**
 * Fold `Identity` through `Either`
 */
export declare const foldMap_: <M>(M: Identity<M>) => <E, A>(fa: E.Either<E, A>, f: (a: A) => M) => M;
/**
 * Fold `Identity` through `Either`
 */
export declare const foldMap: <M>(M: Identity<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M;
//# sourceMappingURL=foldMap.d.ts.map