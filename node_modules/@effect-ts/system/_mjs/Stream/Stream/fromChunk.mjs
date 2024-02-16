// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Creates a stream from an array of values
 */

export function fromChunk(c) {
  return new Stream(T.toManaged(T.map_(T.let_(T.bind_(T.do, "doneRef", () => Ref.makeRef(false)), "pull", ({
    doneRef
  }) => T.flatten(Ref.modify_(doneRef, done => done || A.isEmpty(c) ? Tp.tuple(Pull.end, true) : Tp.tuple(T.succeed(c), true)))), ({
    pull
  }) => pull)));
}
//# sourceMappingURL=fromChunk.mjs.map