// ets_tracing: off
import * as E from "../Either/index.mjs";
import { fromEither } from "./fromEither.mjs";
/**
 * Get the A from an option
 */

export default function tryCatchOption_(ma, onNone) {
  return fromEither(() => E.fromOption_(ma, onNone));
}
/**
 * Get the A from an option
 *
 * @ets_data_first tryCatchOption_
 */

export function tryCatchOption(onNone) {
  return ma => tryCatchOption_(ma, onNone);
}
//# sourceMappingURL=tryCatchOption.mjs.map