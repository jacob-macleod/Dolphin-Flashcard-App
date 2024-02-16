import * as Q from "../../Queue/core.js";
import * as M from "../_internal/managed.js";
import * as TK from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Like `into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
export declare function intoManaged_<R, E, O>(stream: Stream<R, E, O>, queue: Q.XQueue<R, never, never, unknown, TK.Take<E, O>, unknown>): M.Managed<R, E, void>;
/**
 * Like `into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
export declare function intoManaged<R, E, A>(queue: Q.XQueue<R, never, never, unknown, TK.Take<E, A>, unknown>): (self: Stream<R, E, A>) => M.Managed<R, E, void>;
//# sourceMappingURL=intoManaged.d.ts.map