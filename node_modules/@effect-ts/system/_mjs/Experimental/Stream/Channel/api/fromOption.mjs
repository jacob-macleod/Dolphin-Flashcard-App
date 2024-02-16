// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as C from "../core.mjs";
import * as Succeed from "./succeed.mjs";
export function fromOption(option) {
  return O.fold_(option, () => C.fail(O.none), _ => Succeed.succeed(_));
}
//# sourceMappingURL=fromOption.mjs.map