import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";

function unfoldChunksLoop(s, f) {
  return CH.unwrap(T.map_(f(s), O.fold(() => CH.unit, ({
    tuple: [as, s]
  }) => CH.chain_(CH.write(as), () => unfoldChunksLoop(s, f)))));
}
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */


export function unfoldChunksEffect(s, f) {
  return new C.Stream(unfoldChunksLoop(s, f));
}
//# sourceMappingURL=unfoldChunksEffect.mjs.map