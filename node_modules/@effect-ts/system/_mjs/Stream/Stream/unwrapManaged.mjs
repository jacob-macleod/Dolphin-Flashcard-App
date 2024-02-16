import { flatten } from "./flatten.mjs";
import { managed } from "./managed.mjs";
/**
 * Creates a stream produced from a [[ZManaged]]
 */

export function unwrapManaged(fa) {
  return flatten(managed(fa));
}
//# sourceMappingURL=unwrapManaged.mjs.map