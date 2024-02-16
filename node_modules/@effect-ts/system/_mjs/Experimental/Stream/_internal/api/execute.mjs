import * as Drain from "./drain.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * Creates a stream that executes the specified effect but emits no elements.
 */

export function execute(effect) {
  return Drain.drain(FromEffect.fromEffect(effect));
}
//# sourceMappingURL=execute.mjs.map