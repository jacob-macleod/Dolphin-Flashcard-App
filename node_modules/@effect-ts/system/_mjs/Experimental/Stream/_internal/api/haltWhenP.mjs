import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as P from "../../../../Promise/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */

export function haltWhenP_(self, p) {
  const writer = () => CH.unwrap(T.map_(P.poll(p), O.fold(() => CH.readWith(in_ => CH.zipRight_(CH.write(in_), writer()), err => CH.fail(err), _ => CH.unit), io => CH.unwrap(T.fold_(io, _ => CH.fail(_), _ => CH.unit)))));

  return new C.Stream(self.channel[">>>"](writer()));
}
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 *
 * @ets_data_first haltWhenP_
 */

export function haltWhenP(p) {
  return self => haltWhenP_(self, p);
}
//# sourceMappingURL=haltWhenP.mjs.map