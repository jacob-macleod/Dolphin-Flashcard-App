import * as H from "../../../Hub/index.js";
import type * as C from "./core.js";
/**
 * Create a sink which enqueues each element into the specified queue.
 */
export declare function fromHub<R, InErr, E, I>(hub: H.XHub<R, never, E, unknown, I, any>): C.Sink<R, InErr, I, InErr | E, unknown, void>;
//# sourceMappingURL=fromHub.d.ts.map