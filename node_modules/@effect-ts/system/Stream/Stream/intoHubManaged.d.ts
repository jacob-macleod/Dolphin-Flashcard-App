import * as H from "../../Hub/index.js";
import type * as M from "../_internal/managed.js";
import type * as Take from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Like `Stream#intoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
export declare function intoHubManaged_<R, E, O, A>(self: Stream<R, E, O>, hub: H.XHub<R, never, never, unknown, Take.Take<E, O>, A>): M.Managed<R, E, void>;
/**
 * Like `Stream#intoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
export declare function intoHubManaged<R, E, O, A>(hub: H.XHub<R, never, never, unknown, Take.Take<E, O>, A>): (self: Stream<R, E, O>) => M.Managed<R, E, void>;
//# sourceMappingURL=intoHubManaged.d.ts.map