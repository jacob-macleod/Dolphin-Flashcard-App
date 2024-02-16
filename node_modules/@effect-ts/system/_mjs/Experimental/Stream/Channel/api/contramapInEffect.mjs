import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";

function contramapInMReader(f) {
  return ReadWith.readWith(_in => ZipRight.zipRight_(C.chain_(C.fromEffect(f(_in)), _ => C.write(_)), contramapInMReader(f)), err => C.fail(err), done => C.end(done));
}

export function contramapInEffect_(self, f) {
  return C.pipeTo_(contramapInMReader(f), self);
}
/**
 * @ets_data_first contramapInEffect_
 */

export function contramapInEffect(f) {
  return self => contramapInEffect_(self, f);
}
//# sourceMappingURL=contramapInEffect.mjs.map