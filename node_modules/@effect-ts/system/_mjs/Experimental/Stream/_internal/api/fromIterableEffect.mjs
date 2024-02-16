import { identity } from "../../../../Function/index.mjs";
import * as FromEffect from "./fromEffect.mjs";
import * as MapConcat from "./mapConcat.mjs";
/**
 * Creates a stream from an effect producing a value of type `Iterable[A]`
 */

export function fromIterableEffect(iterable) {
  return MapConcat.mapConcat_(FromEffect.fromEffect(iterable), identity);
}
//# sourceMappingURL=fromIterableEffect.mjs.map