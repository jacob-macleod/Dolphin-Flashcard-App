// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as SK from "../Sink/index.mjs";
import { concat_ } from "./concat.mjs";
import { fromChunk } from "./fromChunk.mjs";
import { repeatEffectChunkOption } from "./repeatEffectChunkOption.mjs";
import { run } from "./run.mjs";
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */

export function peel_(self, sink) {
  return M.chain_(self.proc, pull => {
    const stream = repeatEffectChunkOption(pull);
    const s = SK.exposeLeftover(sink);
    return M.map_(T.toManaged(run(s)(stream)), e => Tp.tuple(e.get(0), concat_(fromChunk(e.get(1)), stream)));
  });
}
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */

export function peel(sink) {
  return self => peel_(self, sink);
}
//# sourceMappingURL=peel.mjs.map