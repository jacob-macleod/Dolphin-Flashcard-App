import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`.
 */

export function unfoldChunk(s, f) {
  const loop = s => O.fold_(f(s), () => CH.end(undefined), ({
    tuple: [as, s]
  }) => CH.zipRight_(CH.write(as), loop(s)));

  return new C.Stream(loop(s));
}
//# sourceMappingURL=unfoldChunk.mjs.map