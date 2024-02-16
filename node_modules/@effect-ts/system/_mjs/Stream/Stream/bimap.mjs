import { map_ } from "./map.mjs";
import { mapError_ } from "./mapError.mjs";
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function bimap_(self, f, g) {
  return map_(mapError_(self, f), g);
}
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function bimap(f, g) {
  return self => bimap_(self, f, g);
}
//# sourceMappingURL=bimap.mjs.map