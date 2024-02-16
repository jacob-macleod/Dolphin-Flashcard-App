import { onExitFirst, onExitFirst_ } from "../core.mjs";
/**
 * Ensures that `f` is executed when this `Managed` is finalized, before
 * the existing finalizer.
 *
 * For use cases that need access to the Managed's result, see `onExitFirst`.
 *
 * @ets_data_first ensuringFirst_
 */

export function ensuringFirst(f, __trace) {
  return onExitFirst(() => f, __trace);
}
/**
 * Ensures that `f` is executed when this `Managed` is finalized, before
 * the existing finalizer.
 *
 * For use cases that need access to the Managed's result, see `onExitFirst_`.
 */

export function ensuringFirst_(self, f, __trace) {
  return onExitFirst_(self, () => f, __trace);
}
//# sourceMappingURL=ensuringFirst.mjs.map