import * as H from "../../Hub/index.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from a subscription to a hub.
 */
export declare function fromHubWithShutdown<R, E, A>(hub: H.XHub<never, R, unknown, E, never, A>): Stream<R, E, A>;
//# sourceMappingURL=fromHubWithShutdown.d.ts.map