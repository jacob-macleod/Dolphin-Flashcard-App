// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import { repeatEffectChunkOption } from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from an effect producing values of type `A` until it fails with None.
 */

export const repeatEffectOption = x => repeatEffectChunkOption(T.map_(x, A.single));
//# sourceMappingURL=repeatEffectOption.mjs.map