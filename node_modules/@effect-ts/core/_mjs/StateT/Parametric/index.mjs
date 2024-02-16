import * as HKT from "../../Prelude/HKT/index.mjs";
import * as StateT from "../Classic/index.mjs";
export function monad() {
  return M => getMonad_(M);
}

function getMonad_(M) {
  return StateT.monad(M);
}
//# sourceMappingURL=index.mjs.map