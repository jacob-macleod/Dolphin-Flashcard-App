// ets_tracing: off
import * as A from "../../Collections/Immutable/Array/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { flattenTuples } from "./_internal/flattenTuples.mjs";
import { map } from "./map.mjs";
import { zip_ } from "./zip.mjs";
/**
 * Zips the specified streams together with the specified function.
 */

export function zipN(...[s1, s2, ...streams]) {
  return f => {
    return map(_ => f(...flattenTuples(_)))(A.reduce_(streams, zip_(s1, s2), zip_));
  };
}
//# sourceMappingURL=zipN.mjs.map