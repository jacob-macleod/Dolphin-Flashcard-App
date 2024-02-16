import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Converts an option on values into an option on errors.
 */
export declare function some<R, E, O2>(self: Stream<R, E, O.Option<O2>>): Stream<R, O.None | O.Some<never> | O.Some<E>, O2>;
//# sourceMappingURL=some.d.ts.map