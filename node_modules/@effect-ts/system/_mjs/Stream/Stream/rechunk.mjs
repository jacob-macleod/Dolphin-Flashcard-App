// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
import { halt } from "./halt.mjs";

class State {
  constructor(buffer, done) {
    this.buffer = buffer;
    this.done = done;
  }

}

function emitOrAccumulate(buffer, done, ref, pull, n) {
  if (A.size(buffer) < n) {
    if (done) {
      if (A.isEmpty(buffer)) {
        return Pull.end;
      } else {
        return T.zipRight_(ref.set(new State(A.empty(), true)), Pull.emitChunk(buffer));
      }
    } else {
      return T.foldM_(pull, O.fold(() => emitOrAccumulate(buffer, true, ref, pull, n), Pull.fail), ch => emitOrAccumulate(A.concat_(buffer, ch), false, ref, pull, n));
    }
  } else {
    const {
      tuple: [chunk, leftover]
    } = A.splitAt_(buffer, n);
    return T.zipRight_(ref.set(new State(leftover, done)), Pull.emitChunk(chunk));
  }
}
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */


export function rechunk_(self, n) {
  if (n < 1) {
    return halt(C.die(new C.IllegalArgumentException("chunkN: n must be at least 1")));
  } else {
    return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "ref", () => T.toManaged(Ref.makeRef(new State(A.empty(), false)))), "p", () => self.proc), "pull", ({
      p,
      ref
    }) => T.chain_(ref.get, s => emitOrAccumulate(s.buffer, s.done, ref, p, n))), ({
      pull
    }) => pull));
  }
}
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */

export function rechunk(n) {
  return self => rechunk_(self, n);
}
//# sourceMappingURL=rechunk.mjs.map