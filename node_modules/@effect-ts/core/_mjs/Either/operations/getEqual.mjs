import * as E from "@effect-ts/system/Either";
export function getEqual(EL, EA) {
  return {
    equals: (x, y) => x === y || (E.isLeft(x) ? E.isLeft(y) && EL.equals(x.left, y.left) : E.isRight(y) && EA.equals(x.right, y.right))
  };
}
//# sourceMappingURL=getEqual.mjs.map