// ets_tracing: off
import "../../Operator/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as R from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
export class BufferedPull {
  constructor(upstream, done, cursor) {
    this.upstream = upstream;
    this.done = done;
    this.cursor = cursor;
  }

}
export function ifNotDone_(self, fa) {
  return T.chain_(self.done.get, b => b ? T.fail(O.none) : fa);
}
export function ifNotDone(fa) {
  return self => ifNotDone_(self, fa);
}
export function update(self) {
  return ifNotDone_(self, T.foldM_(self.upstream, O.fold(() => T.chain_(self.done.set(true), () => Pull.end), e => Pull.fail(e)), a => self.cursor.set(Tp.tuple(a, 0))));
}
export function pullElement(self) {
  return ifNotDone_(self, T.flatten(R.modify_(self.cursor, ({
    tuple: [c, i]
  }) => {
    if (i >= A.size(c)) {
      return Tp.tuple(T.chain_(update(self), () => pullElement(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.unsafeGet_(c, i)), Tp.tuple(c, i + 1));
    }
  })));
}
export function pullChunk(self) {
  return ifNotDone_(self, T.flatten(R.modify_(self.cursor, ({
    tuple: [chunk, idx]
  }) => {
    if (idx >= A.size(chunk)) {
      return Tp.tuple(T.chain_(update(self), () => pullChunk(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.drop_(chunk, idx)), Tp.tuple(A.empty(), 0));
    }
  })));
}
export function make(pull) {
  return T.map_(T.bind_(T.bind_(T.do, "done", () => R.makeRef(false)), "cursor", () => R.makeRef(Tp.tuple(A.empty(), 0))), ({
    cursor,
    done
  }) => new BufferedPull(pull, done, cursor));
}
//# sourceMappingURL=index.mjs.map