// ets_tracing: off
import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";

function contramapInReader(f) {
  return ReadWith.readWith(_in => ZipRight.zipRight_(C.write(f(_in)), contramapInReader(f)), err => C.fail(err), done => C.end(done));
}

export function contramapIn_(self, f) {
  return C.pipeTo_(contramapInReader(f), self);
}
/**
 * @ets_data_first contramapIn_
 */

export function contramapIn(f) {
  return self => contramapIn_(self, f);
}
//# sourceMappingURL=contramapIn.mjs.map