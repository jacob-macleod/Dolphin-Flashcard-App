import * as M from "../_internal/managed.mjs";
import { managed } from "./managed.mjs";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */

export function bracket_(acquire, release) {
  return managed(M.make_(acquire, release));
}
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */

export function bracket(release) {
  return acquire => bracket_(acquire, release);
}
//# sourceMappingURL=bracket.mjs.map