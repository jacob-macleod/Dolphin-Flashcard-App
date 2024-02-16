// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as P from "../../Promise/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */

export function haltWhenP_(self, p) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "as", () => self.proc), "done", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    as,
    done
  }) => T.chain_(done.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(P.poll(p), O.fold(() => as, v => T.zipRight_(T.zipRight_(done.set(true), T.mapError_(v, _ => O.some(_))), Pull.end)));
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Halts the evaluation of this stream when the provided promise resolves.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */

export function haltWhenP(p) {
  return self => haltWhenP_(self, p);
}
//# sourceMappingURL=haltWhenP.mjs.map