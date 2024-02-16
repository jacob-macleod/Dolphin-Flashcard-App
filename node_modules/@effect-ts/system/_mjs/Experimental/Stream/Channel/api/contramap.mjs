// ets_tracing: off
import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";

function contramapReader(f) {
  return ReadWith.readWith(_in => ZipRight.zipRight_(C.write(_in), contramapReader(f)), err => C.fail(err), done => C.end(f(done)));
}

export function contramap_(self, f) {
  return C.pipeTo_(contramapReader(f), self);
}
/**
 * @ets_data_first contramap_
 */

export function contramap(f) {
  return self => contramap_(self, f);
}
//# sourceMappingURL=contramap.mjs.map