// ets_tracing: off
import * as Ord from "../Ord/index.mjs";
import * as Ordering from "../Ordering/index.mjs";
export const runtimeOrd = () => Ord.makeOrd((x, y) => Ordering.combine(Ord.number.compare(x.id.startTimeMillis, y.id.startTimeMillis), Ord.number.compare(x.id.seqNumber, y.id.seqNumber)));
//# sourceMappingURL=runtimeOrd.mjs.map