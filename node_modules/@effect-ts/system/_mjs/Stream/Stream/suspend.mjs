// ets_tracing: off
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
export function suspend(f) {
  return new Stream(M.suspend(() => f().proc));
}
//# sourceMappingURL=suspend.mjs.map