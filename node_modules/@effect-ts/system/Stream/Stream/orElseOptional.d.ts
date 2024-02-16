import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseOptional_<R, R1, E1, O, O1>(self: Stream<R, O.Option<E1>, O>, that: Stream<R1, O.Option<E1>, O1>): Stream<R & R1, O.Option<E1>, O1 | O>;
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseOptional<R1, E1, O1>(that: Stream<R1, O.Option<E1>, O1>): <R, O>(self: Stream<R, O.Option<E1>, O>) => Stream<R & R1, O.Option<E1>, O1 | O>;
//# sourceMappingURL=orElseOptional.d.ts.map