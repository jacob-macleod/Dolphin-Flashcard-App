// ets_tracing: off
import "../../../../Operator/index.mjs";
import { _Env, _InDone, _InElem, _InErr, _OutDone, _OutDone2, _OutElem, _OutErr, _OutErr2 } from "./symbols.mjs";
/**
 * A `Channel` is a nexus of I/O operations, which supports both reading and writing.
 * A channel may read values of type `InElem` and write values of type `OutElem`.
 * When the channel finishes, it yields a value of type `OutDone`. A channel may fail with
 * a value of type `OutErr`.
 *
 * Channels are the foundation of Streams: both streams and sinks are built on channels.
 * Most users shouldn't have to use channels directly, as streams and sinks are much more convenient
 * and cover all common use cases. However, when adding new stream and sink operators, or doing
 * something highly specialized, it may be useful to use channels directly.
 *
 * Channels compose in a variety of ways:
 *
 *  - Piping. One channel can be piped to another channel, assuming the input type of the second
 *    is the same as the output type of the first.
 *  - Sequencing. The terminal value of one channel can be used to create another channel, and
 *    both the first channel and the function that makes the second channel can be composed into a
 *    channel.
 *  - Concating. The output of one channel can be used to create other channels, which are all
 *    concatenated together. The first channel and the function that makes the other channels can
 *    be composed into a channel.
 */

export class Channel {
  constructor() {
    this[">>>"] = that => new PipeTo(() => this, () => that);
  }

}
export class Continuation {}
/**
 * @ets_optimize remove
 */

export function concreteContinuation(_) {//
}
export const ContinuationKTypeId = /*#__PURE__*/Symbol();
export class ContinuationK extends Continuation {
  constructor(onSuccess, onHalt) {
    super();
    this.onSuccess = onSuccess;
    this.onHalt = onHalt;
    this._typeId = ContinuationKTypeId;
  }

  onExit(exit) {
    switch (exit._tag) {
      case "Failure":
        {
          return this.onHalt(exit.cause);
        }

      case "Success":
        {
          return this.onSuccess(exit.value);
        }
    }
  }

}
export const ContinuationFinalizerTypeId = /*#__PURE__*/Symbol();
export class ContinuationFinalizer extends Continuation {
  constructor(finalizer) {
    super();
    this.finalizer = finalizer;
    this._typeId = ContinuationFinalizerTypeId;
  }

}
/**
 * @ets_optimize remove
 */

export function concrete(_) {//
}
export const PipeToTypeId = /*#__PURE__*/Symbol();
export class PipeTo extends Channel {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this._typeId = PipeToTypeId;
  }

}
export const ReadTypeId = /*#__PURE__*/Symbol();
export class Read extends Channel {
  constructor(more, done) {
    super();
    this.more = more;
    this.done = done;
    this._typeId = ReadTypeId;
  }

}
export const DoneTypeId = /*#__PURE__*/Symbol();
export class Done extends Channel {
  constructor(terminal) {
    super();
    this.terminal = terminal;
    this._typeId = DoneTypeId;
  }

}
export const HaltTypeId = /*#__PURE__*/Symbol();
export class Halt extends Channel {
  constructor(error) {
    super();
    this.error = error;
    this._typeId = HaltTypeId;
  }

}
export const EffectTypeId = /*#__PURE__*/Symbol();
export class Effect extends Channel {
  constructor(effect) {
    super();
    this.effect = effect;
    this._typeId = EffectTypeId;
  }

}
export const EmitTypeId = /*#__PURE__*/Symbol();
export class Emit extends Channel {
  constructor(out) {
    super();
    this.out = out;
    this._typeId = EmitTypeId;
  }

}
export const EnsuringTypeId = /*#__PURE__*/Symbol();
export class Ensuring extends Channel {
  constructor(channel, finalizer) {
    super();
    this.channel = channel;
    this.finalizer = finalizer;
    this._typeId = EnsuringTypeId;
  }

}
export const ConcatAllTypeId = /*#__PURE__*/Symbol();
export class ConcatAll extends Channel {
  constructor(combineInners, combineAll, value, k) {
    super();
    this.combineInners = combineInners;
    this.combineAll = combineAll;
    this.value = value;
    this.k = k;
    this._typeId = ConcatAllTypeId;
  }

}
export const FoldTypeId = /*#__PURE__*/Symbol();
export class Fold extends Channel {
  constructor(value, k) {
    super();
    this.value = value;
    this.k = k;
    this._typeId = FoldTypeId;
  }

}
export const BridgeTypeId = /*#__PURE__*/Symbol();
export class Bridge extends Channel {
  constructor(input, channel) {
    super();
    this.input = input;
    this.channel = channel;
    this._typeId = BridgeTypeId;
  }

}
export const BracketOutTypeId = /*#__PURE__*/Symbol();
export class BracketOut extends Channel {
  constructor(acquire, finalizer) {
    super();
    this.acquire = acquire;
    this.finalizer = finalizer;
    this._typeId = BracketOutTypeId;
  }

}
export const ProvideTypeId = /*#__PURE__*/Symbol();
export class Provide extends Channel {
  constructor(env, channel) {
    super();
    this.env = env;
    this.channel = channel;
    this._typeId = ProvideTypeId;
  }

}
export const EffectTotalTypeId = /*#__PURE__*/Symbol();
export class EffectTotal extends Channel {
  constructor(effect) {
    super();
    this.effect = effect;
    this._typeId = EffectTotalTypeId;
  }

}
export const EffectSuspendTotalTypeId = /*#__PURE__*/Symbol();
export class EffectSuspendTotal extends Channel {
  constructor(effect) {
    super();
    this.effect = effect;
    this._typeId = EffectSuspendTotalTypeId;
  }

}
//# sourceMappingURL=primitives.mjs.map