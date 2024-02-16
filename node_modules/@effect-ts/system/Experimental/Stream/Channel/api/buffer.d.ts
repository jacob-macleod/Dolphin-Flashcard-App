import type { Predicate } from "../../../../Function/index.js";
import * as Ref from "../../../../Ref/index.js";
import * as C from "../core.js";
/**
 * Creates a channel backed by a buffer. When the buffer is empty, the channel will simply
 * passthrough its input as output. However, when the buffer is non-empty, the value inside
 * the buffer will be passed along as output.
 */
export declare function buffer<InElem, InErr, InDone>(empty: InElem, isEmpty: Predicate<InElem>, ref: Ref.Ref<InElem>): C.Channel<unknown, InErr, InElem, InDone, InErr, InElem, InDone>;
//# sourceMappingURL=buffer.d.ts.map