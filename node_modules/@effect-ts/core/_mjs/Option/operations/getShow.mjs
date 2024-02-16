// ets_tracing: off
import * as O from "@effect-ts/system/Option";
export function getShow(S) {
  return {
    show: ma => O.isNone(ma) ? "none" : `some(${S.show(ma.value)})`
  };
}
//# sourceMappingURL=getShow.mjs.map