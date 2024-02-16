// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Transforms the full causes of failures emitted by this stream.
 */

export function mapErrorCause_(self, f) {
  return new Stream(M.map_(self.proc, T.mapErrorCause(x => O.fold_(C.sequenceCauseOption(x), () => C.fail(O.none), c => C.map(O.some)(f(c))))));
}
/**
 * Transforms the full causes of failures emitted by this stream.
 */

export function mapErrorCause(f) {
  return self => mapErrorCause_(self, f);
}
//# sourceMappingURL=mapErrorCause.mjs.map