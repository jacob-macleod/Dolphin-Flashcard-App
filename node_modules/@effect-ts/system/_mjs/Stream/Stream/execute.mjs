import { drain } from "./drain.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * Creates a stream that executes the specified effect but emits no elements.
 */

export function execute(effect) {
  return drain(fromEffect(effect));
}
//# sourceMappingURL=execute.mjs.map