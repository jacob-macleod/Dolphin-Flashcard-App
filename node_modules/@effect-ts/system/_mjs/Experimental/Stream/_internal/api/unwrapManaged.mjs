import * as Flatten from "./flatten.mjs";
import * as Managed from "./managed.mjs";
/**
 * Creates a stream produced from a managed
 */

export function unwrapManaged(self) {
  return Flatten.flatten(Managed.managed(self));
}
//# sourceMappingURL=unwrapManaged.mjs.map