// ets_tracing: off
import * as A from "../../Collections/Immutable/Array/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { flattenTuples } from "./_internal/flattenTuples.mjs";
import { cross_ } from "./cross.mjs";
import { map } from "./map.mjs";
/**
 * Composes the specified streams to create a cartesian product of elements
 * with a specified function. Subsequent streams would be run multiple times,
 * for every combination of elements in the prior streams.
 *
 * See also `Stream#zipN` for the more common point-wise variant.
 */

export function crossN(...[s1, s2, ...streams]) {
  return f => {
    return map(_ => f(...flattenTuples(_)))(A.reduce_(streams, cross_(s1, s2), cross_));
  };
}
//# sourceMappingURL=crossN.mjs.map