// ets_tracing: off
import * as C from "../core.mjs";
import * as Unwrap from "./unwrap.mjs";
import * as ZipRight from "./zipRight.mjs";
export function fromInput(input) {
  return Unwrap.unwrap(input.takeWith(_ => C.failCause(_), _ => ZipRight.zipRight_(C.write(_), fromInput(input)), _ => C.end(_)));
}
//# sourceMappingURL=fromInput.mjs.map