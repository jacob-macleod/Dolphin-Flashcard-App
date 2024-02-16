import * as O from "../../Option/index.mjs";
/**
 * Gets Right as Option
 */

export function getRight(self) {
  return self._tag === "Right" ? O.some(self.right) : O.none;
}
/**
 * Gets Right
 */

export function unsafeGetRight(self) {
  return self._tag === "Right" ? self.right : void 0;
}
//# sourceMappingURL=getRight.mjs.map