// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import { map } from "./map.mjs";
import { zipWithNext } from "./zipWithNext.mjs";
import { zipWithPrevious } from "./zipWithPrevious.mjs";
/**
 * Zips each element with both the previous and next element.
 */

export function zipWithPreviousAndNext(self) {
  return map(({
    tuple: [{
      tuple: [prev, curr]
    }, next]
  }) => Tp.tuple(prev, curr, O.map_(next, ({
    tuple: [_, r]
  }) => r)))(zipWithNext(zipWithPrevious(self)));
}
//# sourceMappingURL=zipWithPreviousAndNext.mjs.map