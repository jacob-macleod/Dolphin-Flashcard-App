import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as P from "../../Promise/index.mjs";
import * as Pull from "../../Stream/Pull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */

export function interruptWhenP_(self, p) {
  return new Stream(M.map_(M.let_(M.let_(M.bind_(M.bind_(M.do, "as", () => self.proc), "done", () => Ref.makeManagedRef(false)), "asPull", ({
    done
  }) => T.zipRight_(T.zipRight_(T.asSomeError(P.await(p)), done.set(true)), T.fail(O.none))), "pull", ({
    as,
    asPull,
    done
  }) => T.chain_(T.zipWith_(done.get, P.isDone(p), (a, b) => [a, b]), ([a, b]) => {
    if (a) {
      return Pull.end;
    } else if (b) {
      return asPull;
    } else {
      return T.transplant(graft => T.raceFirst_(graft(as), asPull));
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */

export function interruptWhenP(p) {
  return self => interruptWhenP_(self, p);
}
//# sourceMappingURL=interruptWhenP.mjs.map