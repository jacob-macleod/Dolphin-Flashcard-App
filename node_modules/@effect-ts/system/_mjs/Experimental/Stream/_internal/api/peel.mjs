import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as P from "../../../../Promise/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as SK from "../../Sink/index.mjs";
import * as C from "../core.mjs";
import * as HO from "../Handoff.mjs";
import * as RunManaged from "./runManaged.mjs";
const SignalTypeId = /*#__PURE__*/Symbol();
const EmitTypeId = /*#__PURE__*/Symbol();
export class Emit {
  constructor(els) {
    this.els = els;
    this._signalTypeId = SignalTypeId;
    this._typeId = EmitTypeId;
  }

}
const HaltTypeId = /*#__PURE__*/Symbol();
export class Halt {
  constructor(cause) {
    this.cause = cause;
    this._signalTypeId = SignalTypeId;
    this._typeId = HaltTypeId;
  }

}
const EndTypeId = /*#__PURE__*/Symbol();
export class End {
  constructor() {
    this._signalTypeId = SignalTypeId;
    this._typeId = EndTypeId;
  }

}
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */

export function peel_(self, sink) {
  return M.flatten(M.map_(M.bind_(M.bind_(M.do, "p", () => T.toManaged(P.make())), "handoff", () => T.toManaged(HO.make())), ({
    handoff,
    p
  }) => {
    const consumer = SK.foldSink_(SK.exposeLeftover(sink), e => SK.zipRight_(SK.fromEffect(P.fail_(p, e)), SK.fail(e)), ({
      tuple: [z1, leftovers]
    }) => {
      const loop = CH.readWithCause(in_ => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new Emit(in_))), loop), e => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new Halt(e))), CH.failCause(e)), _ => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new End())), CH.unit));
      return new SK.Sink(CH.zipRight_(CH.zipRight_(CH.fromEffect(P.succeed_(p, z1)), CH.fromEffect(HO.offer(handoff, new Emit(leftovers)))), loop));
    });
    const producer = CH.unwrap(T.map_(HO.take(handoff), sig => {
      switch (sig._typeId) {
        case EmitTypeId:
          return CH.zipRight_(CH.write(sig.els), producer);

        case HaltTypeId:
          return CH.failCause(sig.cause);

        default:
          return CH.unit;
      }
    }));
    return M.map_(M.chain_(M.fork(RunManaged.runManaged_(self, consumer)), _ => T.toManaged(P.await(p))), z => Tp.tuple(z, new C.Stream(producer)));
  }));
}
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 *
 * @ets_data_first peel_
 */

export function peel(sink) {
  return self => peel_(self, sink);
}
//# sourceMappingURL=peel.mjs.map