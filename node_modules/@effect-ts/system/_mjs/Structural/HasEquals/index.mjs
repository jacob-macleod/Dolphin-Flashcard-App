import { hash, hasHash } from "../HasHash/index.mjs";
import { createComparator } from "./comparator.mjs";
import { createCircularEqualCreator, sameValueZeroEqual } from "./utils.mjs";
export const equalsSym = /*#__PURE__*/Symbol();
export function hasEquals(u) {
  return hasHash(u) && equalsSym in u;
}
export const deepEquals = /*#__PURE__*/createComparator( /*#__PURE__*/createCircularEqualCreator(eq => (a, b, meta) => {
  if (hasEquals(a)) {
    return a[equalsSym](b);
  } else {
    return eq(a, b, meta);
  }
}));
export function equals(a, b) {
  if (!sameValueZeroEqual(hash(a), hash(b))) {
    return false;
  } else if (hasEquals(a)) {
    return a[equalsSym](b);
  } else if (hasEquals(b)) {
    return b[equalsSym](a);
  }

  return sameValueZeroEqual(a, b);
}
//# sourceMappingURL=index.mjs.map