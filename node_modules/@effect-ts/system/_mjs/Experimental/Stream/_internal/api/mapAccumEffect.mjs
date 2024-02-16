// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 */

export function mapAccumEffect_(self, s, f) {
  const accumulator = s => CH.readWith(in_ => CH.unwrap(T.suspend(() => {
    const outputChunk = CK.builder();

    const emit = a => T.asUnit(T.succeedWith(() => {
      outputChunk.append(a);
    }));

    return T.fold_(T.reduce_(in_, s, (s1, a) => T.chain_(f(s1, a), sa => T.as_(emit(Tp.get_(sa, 1)), Tp.get_(sa, 0)))), failure => {
      const partialResult = outputChunk.build();

      if (!CK.isEmpty(partialResult)) {
        return CH.zipRight_(CH.write(partialResult), CH.fail(failure));
      } else {
        return CH.fail(failure);
      }
    }, _ => CH.zipRight_(CH.write(outputChunk.build()), accumulator(_)));
  })), _ => CH.fail(_), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](accumulator(s)));
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 *
 * @ets_data_first mapAccumEffect_
 */

export function mapAccumEffect(s, f) {
  return self => mapAccumEffect_(self, s, f);
}
//# sourceMappingURL=mapAccumEffect.mjs.map