import { access } from "./core.mjs";
/**
 * Returns an effectful function that extracts out the first element of a
 * tuple.
 */

export function first(__trace) {
  return access(_ => _.get(0), __trace);
}
//# sourceMappingURL=first.mjs.map