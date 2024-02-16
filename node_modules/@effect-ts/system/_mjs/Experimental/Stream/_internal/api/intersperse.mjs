// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Intersperse stream with provided element.
 */

export function intersperse_(self, middle) {
  const writer = isFirst => CH.readWith(chunk => {
    const builder = CK.builder();
    let flagResult = isFirst;
    CK.forEach_(chunk, o => {
      if (flagResult) {
        flagResult = false;
        builder.append(o);
      } else {
        builder.append(middle);
        builder.append(o);
      }
    });
    return CH.zipRight_(CH.write(builder.build()), writer(flagResult));
  }, err => CH.fail(err), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](writer(true)));
}
/**
 * Intersperse stream with provided element.
 *
 * @ets_data_first intersperse_
 */

export function intersperse(middle) {
  return self => intersperse_(self, middle);
}
//# sourceMappingURL=intersperse.mjs.map