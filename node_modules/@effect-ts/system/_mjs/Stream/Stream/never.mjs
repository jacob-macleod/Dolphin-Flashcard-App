// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * The stream that never produces any value or fails with any error.
 */

export const never = /*#__PURE__*/new Stream( /*#__PURE__*/M.succeed(T.never));
//# sourceMappingURL=never.mjs.map