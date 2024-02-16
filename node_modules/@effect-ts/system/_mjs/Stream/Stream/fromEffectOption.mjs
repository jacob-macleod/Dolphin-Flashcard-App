// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Creates a stream from an effect producing a value of type `A` or an empty Stream
 */

export function fromEffectOption(fa) {
  return new Stream(M.map_(M.let_(M.bind_(M.do, "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    doneRef
  }) => T.flatten(Ref.modify_(doneRef, b => b ? Tp.tuple(Pull.end, true) : Tp.tuple(T.map_(fa, a => A.single(a)), true)))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=fromEffectOption.mjs.map