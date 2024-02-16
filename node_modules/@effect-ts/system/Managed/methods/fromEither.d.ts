import * as E from "../../Either/index.js";
/**
 * Lifts an `Either` into a `Managed` value.
 */
export declare function fromEitherWith<E, A>(self: () => E.Either<E, A>, __trace?: string): import("../managed.js").Managed<unknown, E, A>;
/**
 * Lifts an `Either` into a `Managed` value.
 */
export declare function fromEither<E, A>(self: E.Either<E, A>, __trace?: string): import("../managed.js").Managed<unknown, E, A>;
//# sourceMappingURL=fromEither.d.ts.map