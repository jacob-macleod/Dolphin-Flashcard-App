import * as E from "../Either/index.js";
/**
 * Lifts an `Either` into a `Sync` value.
 */
export declare function fromEither<E, A>(f: () => E.Either<E, A>): import("./core.js").Sync<unknown, E, A>;
//# sourceMappingURL=fromEither.d.ts.map