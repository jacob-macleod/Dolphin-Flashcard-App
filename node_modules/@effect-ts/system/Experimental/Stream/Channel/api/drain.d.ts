import * as C from "../core.js";
/**
 * Returns a new channel which reads all the elements from upstream's output channel
 * and ignores them, then terminates with the upstream result value.
 */
export declare function drain<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>): C.Channel<Env, InErr, InElem, InDone, OutErr, never, OutDone>;
//# sourceMappingURL=drain.d.ts.map