// ets_tracing: off
import * as E from "../Either/index.mjs";
import { chain_, succeed, succeedWith } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Lifts an `Either` into a `Effect` value.
 */

export function fromEither(f, __trace) {
  return chain_(succeedWith(f), E.fold(fail, succeed), __trace);
}
//# sourceMappingURL=fromEither.mjs.map