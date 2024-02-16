import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as P from "../../../Promise/index.mjs";
import * as Ref from "../../../Ref/index.mjs";
export class Handoff {
  constructor(ref) {
    this.ref = ref;
  }

}
export function make() {
  return T.map_(T.chain_(P.make(), p => Ref.makeRef(new Empty(p))), _ => new Handoff(_));
}
export const StateTypeId = /*#__PURE__*/Symbol();
export const EmptyTypeId = /*#__PURE__*/Symbol();
export class Empty {
  constructor(notifyConsumer) {
    this.notifyConsumer = notifyConsumer;
    this._stateTypeId = StateTypeId;
    this._typeId = EmptyTypeId;
  }

}
export const FullTypeId = /*#__PURE__*/Symbol();
export class Full {
  constructor(a, notifyConsumer) {
    this.a = a;
    this.notifyConsumer = notifyConsumer;
    this._stateTypeId = StateTypeId;
    this._typeId = FullTypeId;
  }

}
export function offer(handoff, a) {
  return T.chain_(P.make(), p => {
    return T.flatten(Ref.modify_(handoff.ref, s => {
      if (s._typeId === FullTypeId) {
        return Tp.tuple(T.zipRight_(P.await(s.notifyConsumer), offer(handoff, a)), s);
      } else {
        return Tp.tuple(T.zipRight_(P.succeed_(s.notifyConsumer, undefined), P.await(p)), new Full(a, p));
      }
    }));
  });
}
export function take(handoff) {
  return T.chain_(P.make(), p => {
    return T.flatten(Ref.modify_(handoff.ref, s => {
      if (s._typeId === FullTypeId) {
        return Tp.tuple(T.as_(P.succeed_(s.notifyConsumer, undefined), s.a), new Empty(p));
      } else {
        return Tp.tuple(T.zipRight_(P.await(s.notifyConsumer), take(handoff)), s);
      }
    }));
  });
}
export function poll(handoff) {
  return T.chain_(P.make(), p => {
    return T.flatten(Ref.modify_(handoff.ref, s => {
      if (s._typeId === FullTypeId) {
        return Tp.tuple(T.as_(P.succeed_(s.notifyConsumer, undefined), O.some(s.a)), new Empty(p));
      } else {
        return Tp.tuple(T.succeed(O.none), s);
      }
    }));
  });
}
export const HandoffSignalTypeId = /*#__PURE__*/Symbol();
export const EmitTypeId = /*#__PURE__*/Symbol();
export class Emit {
  constructor(els) {
    this.els = els;
    this._handoffSignalTypeId = HandoffSignalTypeId;
    this._typeId = EmitTypeId;
  }

}
export const HaltTypeId = /*#__PURE__*/Symbol();
export class Halt {
  constructor(error) {
    this.error = error;
    this._handoffSignalTypeId = HandoffSignalTypeId;
    this._typeId = HaltTypeId;
  }

}
export const EndTypeId = /*#__PURE__*/Symbol();
export class End {
  constructor(reason) {
    this.reason = reason;
    this._handoffSignalTypeId = HandoffSignalTypeId;
    this._typeId = EndTypeId;
  }

}
//# sourceMappingURL=Handoff.mjs.map