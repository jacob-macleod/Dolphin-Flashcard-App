// ets_tracing: off
import "../../Operator/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { constVoid, pipe } from "../../Function/index.mjs";
import { none, some } from "../../Option/index.mjs";
import * as P from "../../Promise/index.mjs";
import { matchTag } from "../../Utils/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as R from "../_internal/ref.mjs";

class Empty {
  constructor(notifyConsumer) {
    this.notifyConsumer = notifyConsumer;
    this._tag = "Empty";
  }

}

class Full {
  constructor(a, notifyProducer) {
    this.a = a;
    this.notifyProducer = notifyProducer;
    this._tag = "Full";
  }

}
/**
 * A synchronous queue-like abstraction that allows a producer to offer
 * an element and wait for it to be taken, and allows a consumer to wait
 * for an element to be available.
 */


class Handoff {
  constructor(ref) {
    this.ref = ref;
    this._tag = "Handoff";
  }

}

export function make() {
  return T.map_(T.chain_(P.make(), p => R.makeRef(new Empty(p))), ref => new Handoff(ref));
}
export function offer_(h, a) {
  return T.chain_(P.make(), p => T.flatten(R.modify_(h.ref, matchTag({
    Empty: ({
      notifyConsumer
    }) => Tp.tuple(T.zipRight_(P.succeed(constVoid())(notifyConsumer), P.await(p)), new Full(a, p)),
    Full: s => Tp.tuple(T.chain_(P.await(s.notifyProducer), () => offer_(h, a)), s)
  }))));
}
export function offer(a) {
  return h => offer_(h, a);
}
export function take(h) {
  return T.chain_(P.make(), p => T.flatten(R.modify_(h.ref, matchTag({
    Empty: s => Tp.tuple(T.chain_(P.await(s.notifyConsumer), () => take(h)), s),
    Full: ({
      a,
      notifyProducer
    }) => Tp.tuple(T.as_(P.succeed(constVoid())(notifyProducer), a), new Empty(p))
  }))));
}
export function poll(h) {
  return T.chain_(P.make(), p => T.flatten(R.modify_(h.ref, matchTag({
    Empty: s => Tp.tuple(T.succeed(none), s),
    Full: ({
      a,
      notifyProducer
    }) => Tp.tuple(T.as_(P.succeed(constVoid())(notifyProducer), some(a)), new Empty(p))
  }))));
}
//# sourceMappingURL=index.mjs.map