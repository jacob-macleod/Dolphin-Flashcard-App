// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as T from "./deps-core.mjs";
import { managedApply } from "./managed.mjs";
import * as add from "./ReleaseMap/add.mjs";
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action
 * that handles `Exit`. The acquire and release actions will be performed uninterruptibly.
 *
 * @ets_data_first makeExit_
 */

export function makeExit(release, __trace) {
  return acquire => makeExit_(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action
 * that handles `Exit`. The acquire and release actions will be performed uninterruptibly.
 */

export function makeExit_(acquire, release, __trace) {
  return managedApply(T.uninterruptible(T.map_(T.bind_(T.bind_(T.bind_(T.do, "r", () => T.environment()), "a", s => T.provideAll_(acquire, s.r.get(0)), __trace), "rm", s => add.add(ex => T.provideAll_(release(s.a, ex), s.r.get(0), __trace))(s.r.get(1))), s => Tp.tuple(s.rm, s.a))));
}
//# sourceMappingURL=makeExit.mjs.map