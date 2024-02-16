import * as E from "../Either/index.js";
/**
 * Lifts an `Either` into a `Effect` value.
 */
export declare function fromEither<E, A>(f: () => E.Either<E, A>, __trace?: string): import("./effect.js").Effect<unknown, E, A>;
//# sourceMappingURL=fromEither.d.ts.map