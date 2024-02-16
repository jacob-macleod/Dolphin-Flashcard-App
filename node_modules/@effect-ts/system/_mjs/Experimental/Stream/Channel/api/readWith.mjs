// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as C from "../core.mjs";
/**
 * Reads an input and continue exposing both error and completion
 */

export function readWith(inp, error, done) {
  return C.readWithCause(inp, c => E.fold_(CS.failureOrCause(c), error, C.failCause), done);
}
//# sourceMappingURL=readWith.mjs.map