// ets_tracing: off
import * as fe from "../../Effect/fromEither.mjs";
import { fromEffect } from "../fromEffect.mjs";
/**
 * Lifts an `Either` into a `Managed` value.
 */

export function fromEitherWith(self, __trace) {
  return fromEffect(fe.fromEither(self), __trace);
}
/**
 * Lifts an `Either` into a `Managed` value.
 */

export function fromEither(self, __trace) {
  return fromEffect(fe.fromEither(() => self), __trace);
}
//# sourceMappingURL=fromEither.mjs.map