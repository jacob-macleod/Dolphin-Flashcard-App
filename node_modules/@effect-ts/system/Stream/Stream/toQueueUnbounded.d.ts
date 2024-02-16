import * as Q from "../../Queue/index.js";
import * as M from "../_internal/managed.js";
import type * as TK from "../Take/index.js";
import type { Stream } from "./definitions.js";
export declare function toQueueUnbounded<R, E, A>(stream: Stream<R, E, A>): M.Managed<R, never, Q.Dequeue<TK.Take<E, A>>>;
//# sourceMappingURL=toQueueUnbounded.d.ts.map