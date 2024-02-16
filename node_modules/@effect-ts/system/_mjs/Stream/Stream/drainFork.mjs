// ets_tracing: off
import * as P from "../../Promise/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as chain from "./chain.mjs";
import * as crossRight from "./crossRight.mjs";
import * as forEach from "./forEach.mjs";
import * as fromEffect from "./fromEffect.mjs";
import * as interruptWhenP from "./interruptWhenP.mjs";
import { managed } from "./managed.mjs";
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */

export function drainFork_(self, other) {
  return chain.chain_(fromEffect.fromEffect(P.make()), bgDied => crossRight.crossRight_(managed(M.fork(M.catchAllCause_(forEach.forEachManaged_(other, _ => T.unit), _ => T.toManaged(P.halt_(bgDied, _))))), interruptWhenP.interruptWhenP_(self, bgDied)));
}
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */

export function drainFork(other) {
  return self => drainFork_(self, other);
}
//# sourceMappingURL=drainFork.mjs.map