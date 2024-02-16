import * as H from "../../../../Hub/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from a subscription to a hub.
 */
export declare function fromHub_<R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>, maxChunkSize?: number): C.Stream<R, E, A>;
/**
 * Creates a stream from a subscription to a hub.
 *
 * @ets_data_first fromHub_
 */
export declare function fromHub(maxChunkSize?: number): <R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=fromHub.d.ts.map