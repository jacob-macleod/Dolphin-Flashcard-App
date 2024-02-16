import { foldWhileManagedM } from "./foldWhileManagedM.mjs";
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */

export function foldManagedM(s) {
  return f => self => foldWhileManagedM(s)(_ => true)(f)(self);
}
//# sourceMappingURL=foldManagedM.mjs.map