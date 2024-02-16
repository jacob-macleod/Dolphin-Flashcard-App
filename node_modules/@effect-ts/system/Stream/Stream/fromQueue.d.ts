import * as Q from "../../Queue/index.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from a {@link XQueue} of values
 */
export declare function fromQueue<R, E, O>(queue: Q.XQueue<never, R, unknown, E, never, O>): Stream<R, E, O>;
//# sourceMappingURL=fromQueue.d.ts.map