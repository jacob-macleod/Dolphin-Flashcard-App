// ets_tracing: off
import { descriptorWith, succeed } from "./core.mjs";
/**
 * Returns the `FiberID` of the fiber executing the effect that calls this method.
 */

export const fiberId = /*#__PURE__*/descriptorWith(d => succeed(d.id));
//# sourceMappingURL=fiberId.mjs.map