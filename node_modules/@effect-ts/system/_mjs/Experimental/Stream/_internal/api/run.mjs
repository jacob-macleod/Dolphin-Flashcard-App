import * as CH from "../../Channel/index.mjs";
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */

export function run_(self, sink) {
  return CH.runDrain(self.channel[">>>"](sink.channel));
}
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 *
 * @ets_data_first run_
 */

export function run(sink) {
  return self => run_(self, sink);
}
//# sourceMappingURL=run.mjs.map