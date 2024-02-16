import { use_ } from "../Managed/use.mjs";
import * as has from "./has.mjs";
import * as provide from "./provide.mjs";
/**
 * Provides a managed to the given effect
 */

export function provideSomeManaged(managed) {
  return self => use_(managed, a => provide.provide_(self, a));
}
/**
 * Provides a managed to the given effect
 */

export function provideServiceManaged(tag) {
  return managed => self => use_(managed, a => has.provideService(tag)(a)(self));
}
//# sourceMappingURL=provideManaged.mjs.map