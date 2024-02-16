// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";
/**
 * Returns a new channel, which is the same as this one, except its outputs are filtered and
 * transformed by the specified partial function.
 */

export function collect_(self, f) {
  const collector = ReadWith.readWith(o => O.fold_(f(o), () => collector, out2 => ZipRight.zipRight_(C.write(out2), collector)), e => C.fail(e), z => C.end(z));
  return C.pipeTo_(self, collector);
}
/**
 * Returns a new channel, which is the same as this one, except its outputs are filtered and
 * transformed by the specified partial function.
 *
 * @ets_data_first collect_
 */

export function collect(f) {
  return self => collect_(self, f);
}
//# sourceMappingURL=collect.mjs.map