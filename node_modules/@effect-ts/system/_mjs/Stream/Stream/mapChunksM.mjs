import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Effectfully transforms the chunks emitted by this stream.
 */

export function mapChunksM_(self, f) {
  return new Stream(M.map_(self.proc, e => T.chain_(e, x => T.mapError_(f(x), O.some))));
}
/**
 * Effectfully transforms the chunks emitted by this stream.
 */

export function mapChunksM(f) {
  return self => mapChunksM_(self, f);
}
//# sourceMappingURL=mapChunksM.mjs.map