// ets_tracing: off
import { identity } from "../../Function/index.mjs";
import { fromEffect } from "./fromEffect.mjs";
import { mapConcat_ } from "./mapConcat.mjs";
/**
 * Creates a stream from an iterable collection of values
 */

export function fromIterableM(iterable) {
  return mapConcat_(fromEffect(iterable), identity);
}
//# sourceMappingURL=fromIterableM.mjs.map