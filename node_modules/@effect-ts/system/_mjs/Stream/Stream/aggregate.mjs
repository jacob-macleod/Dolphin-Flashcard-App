// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as Option from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Applies an aggregator to the stream, which converts one or more elements
 * of type `A` into elements of type `B`.
 */

export function aggregate_(self, transducer) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "pull", () => self.proc), "push", () => transducer.push), "done", () => Ref.makeManagedRef(false)), "run", ({
    done,
    pull,
    push
  }) => T.chain_(done.get, b => b ? Pull.end : T.foldM_(pull, Option.fold(() => T.chain_(done.set(true), () => T.asSomeError(push(Option.none))), e => Pull.fail(e)), os => T.asSomeError(push(Option.some(os)))))), ({
    run
  }) => run));
}
/**
 * Applies an aggregator to the stream, which converts one or more elements
 * of type `A` into elements of type `B`.
 */

export function aggregate(transducer) {
  return self => aggregate_(self, transducer);
}
//# sourceMappingURL=aggregate.mjs.map