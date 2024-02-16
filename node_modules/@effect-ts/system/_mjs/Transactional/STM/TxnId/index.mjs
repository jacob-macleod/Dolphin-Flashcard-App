// ets_tracing: off
import "../../../Operator/index.mjs";
import { AtomicNumber } from "../../../Support/AtomicNumber/index.mjs";
export const txnCounter = /*#__PURE__*/new AtomicNumber(0);
export function makeTxnId() {
  return txnCounter.incrementAndGet();
}
//# sourceMappingURL=index.mjs.map