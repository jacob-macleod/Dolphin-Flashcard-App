import type { Predicate, Refinement } from "../Function/index.js";
import type { IO } from "./effect.js";
/**
 * Lift a predicate into an effectful function
 */
export declare function fromPredicate<E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IO<E, B>;
export declare function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IO<E, A>;
//# sourceMappingURL=fromPredicate.d.ts.map