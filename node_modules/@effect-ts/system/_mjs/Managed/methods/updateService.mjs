import { provideSome_ } from "../core.mjs";
/**
 * Updates a service in the environment of this effect.
 */

export function updateService_(self, tag, f, __trace) {
  return provideSome_(self, r => ({ ...r,
    ...tag.has(f(tag.read(r)))
  }), __trace);
}
/**
 * Updates a service in the environment of this effect.
 *
 * @ets_data_first updateService_
 */

export function updateService(tag, f, __trace) {
  return self => updateService_(self, tag, f, __trace);
}
//# sourceMappingURL=updateService.mjs.map