// ets_tracing: off
import * as C from "../core.mjs";
import * as ReadWith from "./readWith.mjs";
import * as ZipRight from "./zipRight.mjs";
export function identity() {
  return ReadWith.readWith(_in => ZipRight.zipRight_(C.write(_in), identity()), err => C.fail(err), done => C.end(done));
}
//# sourceMappingURL=identity.mjs.map