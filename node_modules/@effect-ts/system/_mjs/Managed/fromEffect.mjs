// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as T from "./deps-core.mjs";
import { managedApply } from "./managed.mjs";
import * as Finalizer from "./ReleaseMap/finalizer.mjs";
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with no release action. The
 * effect will be performed interruptibly.
 */

export function fromEffect(effect, __trace) {
  return managedApply(T.map_(T.provideSome_(effect, _ => _.get(0), __trace), a => Tp.tuple(Finalizer.noopFinalizer, a)));
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed<R, E, A>` with no release action. The
 * effect will be performed uninterruptibly. You usually want the `fromEffect`
 * variant.
 */

export function fromEffectUninterruptible(effect, __trace) {
  return fromEffect(T.uninterruptible(effect), __trace);
}
//# sourceMappingURL=fromEffect.mjs.map