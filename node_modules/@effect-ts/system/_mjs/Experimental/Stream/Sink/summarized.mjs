// ets_tracing: off
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Summarize a sink by running an effect when the sink starts and again when it completes
 */

export function summarized_(self, summary, f) {
  return new C.Sink(CH.map_(CH.bind("end", () => CH.fromEffect(summary))(CH.bind("done", () => self.channel)(CH.bind("start", () => CH.fromEffect(summary))(CH.do))), ({
    done,
    end,
    start
  }) => Tp.tuple(done, f(start, end))));
}
/**
 * Summarize a sink by running an effect when the sink starts and again when it completes
 * @ets_data_first summarized_
 */

export function summarized(summary, f) {
  return self => summarized_(self, summary, f);
}
//# sourceMappingURL=summarized.mjs.map