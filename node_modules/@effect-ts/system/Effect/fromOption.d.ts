import * as O from "../Option/index.js";
import type { IO } from "./effect.js";
/**
 * Lifts an `Option` into a `Effect` but preserves the error as an option in the error channel, making it easier to compose
 * in some scenarios.
 */
export declare function fromOption<A>(o: O.Option<A>, __trace?: string): IO<O.Option<never>, A>;
/**
 * Lifts a nullable value into a `Effect` but preserves the error as an option in the error channel, making it easier to compose
 * in some scenarios.
 */
export declare function fromNullable<A>(o: A, __trace?: string): IO<O.Option<never>, NonNullable<A>>;
//# sourceMappingURL=fromOption.d.ts.map