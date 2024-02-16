import { map_ } from "./map.mjs";
/**
 * Maps the success value of this effect to a service.
 *
 * @datFirst asService_
 */

export function asService(has, __trace) {
  return fa => asService_(fa, has, __trace);
}
/**
 * Maps the success value of this effect to a service.
 */

export function asService_(fa, tag, __trace) {
  return map_(fa, tag.has, __trace);
}
//# sourceMappingURL=asService.mjs.map