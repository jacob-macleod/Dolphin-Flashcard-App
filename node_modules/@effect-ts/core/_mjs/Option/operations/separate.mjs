// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
const defaultSeparate = /*#__PURE__*/Tp.tuple(O.none, O.none);
export function separate(ma) {
  const o = O.map_(ma, e => Tp.tuple(O.getLeft(e), O.getRight(e)));
  return O.isNone(o) ? defaultSeparate : o.value;
}
//# sourceMappingURL=separate.mjs.map