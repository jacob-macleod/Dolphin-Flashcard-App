// ets_tracing: off
import { Runtime } from "../FiberRef/index.mjs";
import { identity } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
/**
 * A `FiberRef` that stores the name of the fiber, which defaults to `None`.
 */

export const fiberName = /*#__PURE__*/new Runtime(O.none, identity, identity);
//# sourceMappingURL=fiberName.mjs.map