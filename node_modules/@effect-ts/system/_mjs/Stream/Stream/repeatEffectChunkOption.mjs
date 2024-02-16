import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Creates a stream from an effect producing chunks of `A` values until it fails with None.
 */

export function repeatEffectChunkOption(fa) {
  return new Stream(M.map_(M.let_(M.bind_(M.do, "done", () => Ref.makeManagedRef(false)), "pull", ({
    done
  }) => T.chain_(done.get, b => b ? Pull.end : T.tapError_(fa, O.fold(() => done.set(true), () => T.unit)))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=repeatEffectChunkOption.mjs.map