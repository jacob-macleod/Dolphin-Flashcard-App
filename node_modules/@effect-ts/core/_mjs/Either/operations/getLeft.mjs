import * as O from "../../Option/index.mjs";
/**
 * Gets Left
 */

export function unsafeGetLeft(self) {
  return self._tag === "Left" ? self.left : void 0;
}
/**
 * Gets Left as Option
 */

export function getLeft(self) {
  return self._tag === "Left" ? O.some(self.left) : O.none;
}
//# sourceMappingURL=getLeft.mjs.map