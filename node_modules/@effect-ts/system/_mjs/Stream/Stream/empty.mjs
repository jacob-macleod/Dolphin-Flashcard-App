// ets_tracing: off
import { succeed } from "../_internal/managed.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * The empty stream
 */

export const empty = /*#__PURE__*/new Stream( /*#__PURE__*/succeed(Pull.end));
//# sourceMappingURL=empty.mjs.map