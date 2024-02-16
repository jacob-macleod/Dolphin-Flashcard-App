import * as O from "../Option/index.js";
import type { Promise } from "./promise.js";
/**
 * Checks for completion of this Promise. Returns the result effect if this
 * promise has already been completed or a `None` otherwise.
 */
export declare function poll<E, A>(promise: Promise<E, A>): import("../Effect/effect.js").UIO<O.None | O.Some<import("../Effect/effect.js").IO<E, A>>>;
//# sourceMappingURL=poll.d.ts.map