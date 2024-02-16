import * as M from "../_internal/managed.mjs";
import { managed } from "./managed.mjs";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */

export function bracketExit_(acquire, release) {
  return managed(M.makeExit_(acquire, release));
}
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */

export function bracketExit(release) {
  return acquire => bracketExit_(acquire, release);
}
//# sourceMappingURL=bracketExit.mjs.map