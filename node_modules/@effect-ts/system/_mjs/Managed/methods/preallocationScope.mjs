// ets_tracing: off
import { map_ } from "../core.mjs";
import * as T from "../deps-core.mjs";
import { makeExit_ } from "../makeExit.mjs";
import { scope } from "./api.mjs";
/**
 * Creates a scope in which resources can be safely preallocated.
 */

export const preallocationScope = /*#__PURE__*/map_(scope, allocate => managed => T.map_(allocate(managed), ({
  tuple: [release, res]
}) => makeExit_(T.succeed(res), (_, exit) => release(exit))));
//# sourceMappingURL=preallocationScope.mjs.map