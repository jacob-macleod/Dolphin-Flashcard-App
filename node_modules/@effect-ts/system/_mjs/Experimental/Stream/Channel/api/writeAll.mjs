// ets_tracing: off
import * as A from "../../../../Collections/Immutable/Array/index.mjs";
import * as C from "../core.mjs";
import * as ZipRight from "./zipRight.mjs";
export function writeAll(...outs) {
  return A.reduceRight_(outs, C.end(undefined), (out, conduit) => ZipRight.zipRight_(C.write(out), conduit));
}
//# sourceMappingURL=writeAll.mjs.map