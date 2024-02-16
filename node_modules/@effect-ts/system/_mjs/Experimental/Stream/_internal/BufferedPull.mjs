// ets_tracing: off
import * as A from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as Ref from "../../../Ref/index.mjs";
import * as Pull from "../Pull/index.mjs";
export class BufferedPull {
  constructor(upstream, done, cursor) {
    this.upstream = upstream;
    this.done = done;
    this.cursor = cursor;
  }

}
export function make(upstream) {
  return T.map_(T.bind_(T.bind_(T.do, "done", () => Ref.makeRef(false)), "cursor", () => Ref.makeRef(Tp.tuple(A.empty(), 0))), ({
    cursor,
    done
  }) => new BufferedPull(upstream, done, cursor));
}
export function ifNotDone_(self, fa) {
  return T.chain_(Ref.get(self.done), _ => {
    if (_) {
      return Pull.end;
    } else {
      return fa;
    }
  });
}
/**
 * @ets_data_first ifNotDone_
 */

export function ifNotDone(fa) {
  return self => ifNotDone_(self, fa);
}
export function update(self) {
  return ifNotDone_(self, T.foldM_(self.upstream, O.fold(() => T.zipRight_(Ref.set_(self.done, true), Pull.end), e => Pull.fail(e)), chunk => Ref.set_(self.cursor, Tp.tuple(chunk, 0))));
}
export function pullElement(self) {
  return ifNotDone_(self, T.flatten(Ref.modify_(self.cursor, ({
    tuple: [chunk, idx]
  }) => {
    if (idx >= A.size(chunk)) {
      return Tp.tuple(T.zipRight_(update(self), pullElement(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.unsafeGet_(chunk, idx)), Tp.tuple(A.empty(), idx + 1));
    }
  })));
}
export function pullChunk(self) {
  return ifNotDone_(self, T.flatten(Ref.modify_(self.cursor, ({
    tuple: [chunk, idx]
  }) => {
    if (idx >= A.size(chunk)) {
      return Tp.tuple(T.zipRight_(update(self), pullChunk(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.drop_(chunk, idx)), Tp.tuple(A.empty(), 0));
    }
  })));
}
//# sourceMappingURL=BufferedPull.mjs.map