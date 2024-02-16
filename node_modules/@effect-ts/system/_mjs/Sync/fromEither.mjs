// ets_tracing: off
import * as E from "../Either/index.mjs";
import { chain_, fail, succeed, succeedWith } from "./core.mjs";
/**
 * Lifts an `Either` into a `Sync` value.
 */

export function fromEither(f) {
  return chain_(succeedWith(f), E.fold(fail, succeed));
}
//# sourceMappingURL=fromEither.mjs.map