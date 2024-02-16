// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as AB from "../../../../Support/AtomicBoolean/index.mjs";
import * as AR from "../../../../Support/AtomicReference/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Applies the transducer to the stream and emits its outputs.
 */

export function transduce_(self, sink) {
  return new C.Stream(CH.suspend(() => {
    const leftovers = new AR.AtomicReference(CK.empty());
    const upstreamDone = new AB.AtomicBoolean(false);
    const buffer = CH.suspend(() => {
      const l = leftovers.get;

      if (CK.isEmpty(l)) {
        return CH.readWith(c => CH.zipRight_(CH.write(c), buffer), e => CH.fail(e), done => CH.end(done));
      } else {
        leftovers.set(CK.empty());
        return CH.zipRight_(CH.writeChunk(l), buffer);
      }
    });

    const concatAndGet = c => {
      const ls = leftovers.get;
      const concat = CK.concat_(ls, CK.filter_(c, a => !CK.isEmpty(a)));
      leftovers.set(concat);
      return concat;
    };

    const upstreamMarker = CH.readWith(_in => CH.zipRight_(CH.write(_in), upstreamMarker), err => CH.fail(err), done => CH.zipRight_(CH.succeedWith(() => upstreamDone.set(true)), CH.end(done)));
    const transducer = CH.chain_(CH.doneCollect(sink.channel), ({
      tuple: [leftover, z]
    }) => CH.chain_(CH.succeedWith(() => Tp.tuple(upstreamDone.get, concatAndGet(leftover))), ({
      tuple: [done, newLeftovers]
    }) => {
      const nextChannel = done && CK.isEmpty(newLeftovers) ? CH.end(undefined) : transducer;
      return CH.zipRight_(CH.write(CK.single(z)), nextChannel);
    }));
    return self.channel[">>>"](upstreamMarker)[">>>"](buffer)[">>>"](transducer);
  }));
}
/**
 * Applies the transducer to the stream and emits its outputs.
 *
 * @ets_data_first transduce_
 */

export function transduce(sink) {
  return self => transduce_(self, sink);
}
//# sourceMappingURL=transduce.mjs.map