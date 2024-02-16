import * as H from "../../Hub/index.js";
import type * as T from "../_internal/effect.js";
import type * as Take from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Publishes elements of this stream to a hub. Stream failure and ending will also be
 * signalled.
 */
export declare function intoHub<R, E, O, A>(self: Stream<R, E, O>, hub: H.XHub<R, never, never, unknown, Take.Take<E, O>, A>): T.Effect<R, E, void>;
//# sourceMappingURL=intoHub.d.ts.map