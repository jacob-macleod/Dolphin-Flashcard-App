// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as P from "../../../../Promise/index.mjs";
import * as Chain from "./chain.mjs";
import * as CrossRight from "./crossRight.mjs";
import * as FromEffect from "./fromEffect.mjs";
import * as InterruptWhenP from "./interruptWhenP.mjs";
import * as Managed from "./managed.mjs";
import * as RunForEachManaged from "./runForEachManaged.mjs";
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */

export function drainFork_(self, other) {
  return Chain.chain_(FromEffect.fromEffect(P.make()), bgDied => CrossRight.crossRight_(Managed.managed(M.fork(M.catchAllCause_(RunForEachManaged.runForEachManaged_(other, _ => T.unit), _ => T.toManaged(P.halt_(bgDied, _))))), InterruptWhenP.interruptWhenP_(self, bgDied)));
}
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 *
 * @ets_data_first drainFork_
 */

export function drainFork(other) {
  return self => drainFork_(self, other);
}
//# sourceMappingURL=drainFork.mjs.map