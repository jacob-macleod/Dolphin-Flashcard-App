import { map_ } from "./map.mjs";
/**
 * Maps the success values of this stream to the specified constant value.
 */

export function as_(self, o2) {
  return map_(self, () => o2);
}
/**
 * Maps the success values of this stream to the specified constant value.
 */

export function as(o2) {
  return self => map_(self, () => o2);
}
//# sourceMappingURL=as.mjs.map