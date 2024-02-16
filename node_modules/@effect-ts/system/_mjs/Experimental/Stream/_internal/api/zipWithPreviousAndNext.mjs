// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Map from "./map.mjs";
import * as ZipWithNext from "./zipWithNext.mjs";
import * as ZipWithPrevious from "./zipWithPrevious.mjs";
/**
 * Zips each element with both the previous and next element.
 */

export function zipWithPreviousAndNext(self) {
  return Map.map_(ZipWithNext.zipWithNext(ZipWithPrevious.zipWithPrevious(self)), ({
    tuple: [{
      tuple: [prev, curr]
    }, next]
  }) => Tp.tuple(prev, curr, O.map_(next, Tp.get(1))));
}
//# sourceMappingURL=zipWithPreviousAndNext.mjs.map