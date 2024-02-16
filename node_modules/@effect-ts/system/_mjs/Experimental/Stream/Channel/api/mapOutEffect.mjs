import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";

const mapOutMReader = f => ReadWith.readWith(out => ZipRight.zipRight_(C.chain_(C.fromEffect(f(out)), _ => C.write(_)), mapOutMReader(f)), e => C.fail(e), z => C.end(z));

export function mapOutEffect_(self, f) {
  return C.pipeTo_(self, mapOutMReader(f));
}
/**
 * @ets_data_first mapOutEffect_
 */

export function mapOutEffect(f) {
  return self => mapOutEffect_(self, f);
}
//# sourceMappingURL=mapOutEffect.mjs.map