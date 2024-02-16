import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */

export function unfoldChunkM(z, f) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "done", () => Ref.makeManagedRef(false)), "ref", () => Ref.makeManagedRef(z)), "pull", ({
    done,
    ref
  }) => T.chain_(done.get, isDone => isDone ? Pull.end : T.foldM_(T.chain_(ref.get, f), Pull.fail, O.fold(() => T.chain_(done.set(true), () => Pull.end), ({
    tuple: [a, z]
  }) => T.map_(ref.set(z), () => a))))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=unfoldChunkM.mjs.map