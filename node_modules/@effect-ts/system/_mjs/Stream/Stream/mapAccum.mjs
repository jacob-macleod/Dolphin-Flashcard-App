import * as T from "../_internal/effect.mjs";
import { mapAccumM_ } from "./mapAccumM.mjs";
/**
 * Statefully maps over the elements of this stream to produce new elements.
 */

export function mapAccum_(self, z, f) {
  return mapAccumM_(self, z, (z, o) => T.succeed(f(z, o)));
}
/**
 * Statefully maps over the elements of this stream to produce new elements.
 *
 * @ets_data_first mapAccum_
 */

export function mapAccum(z, f) {
  return self => mapAccum_(self, z, f);
}
//# sourceMappingURL=mapAccum.mjs.map