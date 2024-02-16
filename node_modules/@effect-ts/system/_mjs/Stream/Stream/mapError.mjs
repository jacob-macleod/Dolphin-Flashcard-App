// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Transforms the errors emitted by this stream using `f`.
 */

export function mapError_(self, f) {
  return new Stream(M.map_(self.proc, T.mapError(O.map(f))));
}
/**
 * Transforms the errors emitted by this stream using `f`.
 */

export function mapError(f) {
  return self => mapError_(self, f);
}
//# sourceMappingURL=mapError.mjs.map