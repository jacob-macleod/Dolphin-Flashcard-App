// ets_tracing: off
import * as T from "../../Effect/index.mjs";
import { tag } from "../../Has/index.mjs";
import * as L from "../../Layer/index.mjs";
export const LiveId = /*#__PURE__*/Symbol.for("@effect-ts/system/Test/LiveId");
export const Live = /*#__PURE__*/tag(LiveId);
export const live = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.access(r => ({
  serviceId: LiveId,
  provide: T.provideAll(r)
})), Live);
//# sourceMappingURL=index.mjs.map