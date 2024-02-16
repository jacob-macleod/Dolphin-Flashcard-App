import * as H from "../../Hub/index.js";
import * as M from "../_internal/managed.js";
import type * as Take from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 */
export declare function toHub_<R, E, O>(self: Stream<R, E, O>, capacity: number): M.Managed<R, never, H.XHub<never, unknown, unknown, never, never, Take.Take<E, O>>>;
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 */
export declare function toHub(capacity: number): <R, E, O>(self: Stream<R, E, O>) => M.Managed<R, never, H.XHub<never, unknown, unknown, never, never, Take.Take<E, O>>>;
//# sourceMappingURL=toHub.d.ts.map