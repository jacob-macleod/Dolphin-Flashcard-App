// ets_tracing: off
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as SS from "../../Collections/Immutable/SortedSet/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as E from "../../Either/index.mjs";
import { runtimeOrd } from "../../Fiber/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as Supervisor from "../../Supervisor/index.mjs";
import { AtomicReference } from "../../Support/AtomicReference/index.mjs";
import * as Annotations from "../Annotations/index.mjs";
import { Int } from "../Int/index.mjs";
import { fibers } from "../TestAnnotation/index.mjs";
export function fibersPerTest(self) {
  const acquire = T.tap_(T.succeedWith(() => new AtomicReference(SS.make(runtimeOrd()))), ref => Annotations.annotate(fibers, E.right(Chunk.single(ref))));
  const release = T.chain_(Annotations.get(fibers), f => {
    switch (f._tag) {
      case "Left":
        return T.unit;

      case "Right":
        return T.tap_(T.map_(T.map_(T.forEach_(f.right, _ => T.succeedWith(() => _.get)), Chunk.reduce(SS.make(runtimeOrd()), SS.union_)), SS.size), n => Annotations.annotate(fibers, E.left(Int(n))));
    }
  });
  return T.bracket_(acquire, ref => T.chain_(Supervisor.fibersIn(ref), supervisor => T.supervised_(self, supervisor)), () => release);
}
//# sourceMappingURL=index.mjs.map