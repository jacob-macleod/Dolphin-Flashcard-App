import { descriptorWith } from "./core.mjs";
/**
 * Passes the fiber's scope to the specified function, which creates an effect
 * that will be returned from this method.
 */

export function scopeWith(f, __trace) {
  return descriptorWith(d => f(d.scope), __trace);
}
//# sourceMappingURL=scopeWith.mjs.map