import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function leftover(c) {
  return new C.Sink(CH.write(c));
}
//# sourceMappingURL=leftover.mjs.map