// ets_tracing: off
import { fromEffect } from "../Managed/fromEffect.mjs";
import { makeExit_ } from "../Managed/makeExit.mjs";
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 */

export function toManaged(self) {
  return fromEffect(self);
}
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 */

export function toManagedRelease_(self, release) {
  return makeExit_(self, release);
}
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 *
 * @ets_data_first toManagedRelease_
 */

export function toManagedRelease(release) {
  return self => makeExit_(self, release);
}
//# sourceMappingURL=toManaged.mjs.map