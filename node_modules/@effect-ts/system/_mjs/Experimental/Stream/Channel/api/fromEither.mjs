// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as C from "../core.mjs";
import * as Succeed from "./succeed.mjs";
export function fromEither(either) {
  return E.fold_(either, C.fail, Succeed.succeed);
}
//# sourceMappingURL=fromEither.mjs.map