import * as O from "../../Option/index.mjs";
import { catchAllCause_ } from "./catchAllCause.mjs";
import { halt } from "./halt.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */

export function catchSomeCause_(self, f) {
  return catchAllCause_(self, cause => O.getOrElse_(f(cause), () => halt(cause)));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */

export function catchSomeCause(f) {
  return self => catchSomeCause_(self, f);
}
//# sourceMappingURL=catchSomeCause.mjs.map