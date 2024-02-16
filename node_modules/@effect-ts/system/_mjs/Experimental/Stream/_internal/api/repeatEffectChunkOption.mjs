import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as UnfoldChunkEffect from "./unfoldChunkEffect.mjs";
/**
 * Creates a stream from an effect producing chunks of `A` values until it fails with None.
 */

export function repeatEffectChunkOption(fa) {
  return UnfoldChunkEffect.unfoldChunkEffect(fa, fa => {
    return T.catchAll_(T.map_(fa, chunk => O.some(Tp.tuple(chunk, fa))), O.fold(() => T.none, e => T.fail(e)));
  });
}
//# sourceMappingURL=repeatEffectChunkOption.mjs.map