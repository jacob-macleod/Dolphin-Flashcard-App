// ets_tracing: off
import * as Chunk from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";

function isTuple(t) {
  return t instanceof Tp.Tuple && t.tuple.length === 2;
}

export function flattenTuples(tuples) {
  let result = Chunk.empty();
  let {
    tuple: [a, b]
  } = tuples;

  for (;;) {
    if (isTuple(a)) {
      result = Chunk.prepend_(result, b);
      [a, b] = a.tuple;
    } else {
      result = Chunk.concat_(Chunk.concat_(Chunk.single(a), Chunk.single(b)), result);
      break;
    }
  }

  return result;
}
//# sourceMappingURL=flattenTuples.mjs.map