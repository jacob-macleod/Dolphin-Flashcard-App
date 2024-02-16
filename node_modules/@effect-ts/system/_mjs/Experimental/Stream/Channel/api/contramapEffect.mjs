import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";

function contramapMReader(f) {
  return ReadWith.readWith(_in => ZipRight.zipRight_(C.write(_in), contramapMReader(f)), err => C.fail(err), done0 => C.fromEffect(f(done0)));
}

export function contramapEffect_(self, f) {
  return C.pipeTo_(contramapMReader(f), self);
}
/**
 * @ets_data_first contramapEffect_
 */

export function contramapEffect(f) {
  return self => contramapEffect_(self, f);
}
//# sourceMappingURL=contramapEffect.mjs.map