import { fork } from "../Managed/fork.mjs";
import { toManaged } from "./toManaged.mjs";
/**
 * Forks the fiber in a `Managed`. Using the `Managed` value will
 * execute the effect in the fiber, while ensuring its interruption when
 * the effect supplied to `use` completes.
 */

export function forkManaged(self, __trace) {
  return fork(toManaged(self), __trace);
}
//# sourceMappingURL=forkManaged.mjs.map