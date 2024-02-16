// ets_tracing: off
import * as O from "../../Option/index.mjs";
import * as T from "../deps-core.mjs";
import { addIfOpen } from "./addIfOpen.mjs";
import { release } from "./release.mjs";
export function add(finalizer) {
  return _ => T.map_(addIfOpen(finalizer)(_), O.fold(() => () => T.unit, k => e => release(k, e)(_)));
}
//# sourceMappingURL=add.mjs.map