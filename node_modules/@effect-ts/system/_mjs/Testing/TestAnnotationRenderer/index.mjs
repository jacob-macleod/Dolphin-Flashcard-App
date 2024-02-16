// ets_tracing: off
import * as List from "../../Collections/Immutable/List/index.mjs";
import { pipe } from "../../Function/index.mjs";
export class CompositeRenderer {
  constructor(_) {
    this.run = (ancestors, child) => List.chain(_ => _.run(ancestors, child))(this.renderers);

    this.renderers = List.from(_);
  }

}
export const standard = /*#__PURE__*/new CompositeRenderer([]);
//# sourceMappingURL=index.mjs.map