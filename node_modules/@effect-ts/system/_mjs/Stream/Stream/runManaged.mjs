// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */

export function runManaged_(self, sink) {
  return M.mapM(([pull, push]) => {
    const go = T.foldCauseM_(pull, c => O.fold_(C.sequenceCauseOption(c), () => T.foldCauseM_(push(O.none), c => E.fold_(C.sequenceCauseEither(C.map(_ => _.get(0))(c)), T.halt, T.succeed), () => T.dieMessage("empty stream / empty sinks")), T.halt), os => T.foldCauseM_(push(O.some(os)), c => E.fold_(C.sequenceCauseEither(C.map(_ => _.get(0))(c)), T.halt, T.succeed), () => go));
    return go;
  })(M.zip_(self.proc, sink.push));
}
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */

export function runManaged(sink) {
  return self => runManaged_(self, sink);
}
//# sourceMappingURL=runManaged.mjs.map