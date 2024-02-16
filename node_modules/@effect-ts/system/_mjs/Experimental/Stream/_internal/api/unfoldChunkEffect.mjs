import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */

export function unfoldChunkEffect(s, f) {
  const loop = s => CH.unwrap(T.map_(f(s), O.fold(() => CH.end(undefined), ({
    tuple: [as, s]
  }) => CH.zipRight_(CH.write(as), loop(s)))));

  return new C.Stream(loop(s));
}
//# sourceMappingURL=unfoldChunkEffect.mjs.map