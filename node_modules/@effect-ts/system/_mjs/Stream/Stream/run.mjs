// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as M from "../_internal/managed.mjs";
import { runManaged } from "./runManaged.mjs";
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */

export function run_(self, sink) {
  return M.useNow(runManaged(sink)(self));
}
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */

export function run(sink) {
  return self => run_(self, sink);
}
//# sourceMappingURL=run.mjs.map