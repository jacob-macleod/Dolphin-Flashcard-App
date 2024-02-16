// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { environment, map } from "../deps.mjs";
import { managedApply } from "../managed.mjs";
import { noopFinalizer } from "../ReleaseMap/finalizer.mjs";
/**
 * Provides access to the entire map of resources allocated by this {@link Managed}.
 */

export const releaseMap = /*#__PURE__*/managedApply( /*#__PURE__*/map(tp => Tp.tuple(noopFinalizer, tp.get(1)))( /*#__PURE__*/environment()));
//# sourceMappingURL=releaseMap.mjs.map