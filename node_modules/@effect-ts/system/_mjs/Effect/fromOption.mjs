// ets_tracing: off
import * as O from "../Option/index.mjs";
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Lifts an `Option` into a `Effect` but preserves the error as an option in the error channel, making it easier to compose
 * in some scenarios.
 */

export function fromOption(o, __trace) {
  return o._tag === "None" ? fail(O.none, __trace) : succeed(o.value, __trace);
}
/**
 * Lifts a nullable value into a `Effect` but preserves the error as an option in the error channel, making it easier to compose
 * in some scenarios.
 */

export function fromNullable(o, __trace) {
  return fromOption(O.fromNullable(o), __trace);
}
//# sourceMappingURL=fromOption.mjs.map