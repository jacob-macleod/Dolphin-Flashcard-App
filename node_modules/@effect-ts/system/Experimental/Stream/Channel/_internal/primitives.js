"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadTypeId = exports.Read = exports.ProvideTypeId = exports.Provide = exports.PipeToTypeId = exports.PipeTo = exports.HaltTypeId = exports.Halt = exports.FoldTypeId = exports.Fold = exports.EnsuringTypeId = exports.Ensuring = exports.EmitTypeId = exports.Emit = exports.EffectTypeId = exports.EffectTotalTypeId = exports.EffectTotal = exports.EffectSuspendTotalTypeId = exports.EffectSuspendTotal = exports.Effect = exports.DoneTypeId = exports.Done = exports.ContinuationKTypeId = exports.ContinuationK = exports.ContinuationFinalizerTypeId = exports.ContinuationFinalizer = exports.Continuation = exports.ConcatAllTypeId = exports.ConcatAll = exports.Channel = exports.BridgeTypeId = exports.Bridge = exports.BracketOutTypeId = exports.BracketOut = void 0;
exports.concrete = concrete;
exports.concreteContinuation = concreteContinuation;

require("../../../../Operator/index.js");

var _symbols = /*#__PURE__*/require("./symbols.js");

// ets_tracing: off

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
class Channel {
  constructor() {
    this[">>>"] = that => new PipeTo(() => this, () => that);
  }

}

exports.Channel = Channel;

class Continuation {}
/**
 * @ets_optimize remove
 */


exports.Continuation = Continuation;

function concreteContinuation(_) {//
}

const ContinuationKTypeId = /*#__PURE__*/Symbol();
exports.ContinuationKTypeId = ContinuationKTypeId;

class ContinuationK extends Continuation {
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

exports.ContinuationK = ContinuationK;
const ContinuationFinalizerTypeId = /*#__PURE__*/Symbol();
exports.ContinuationFinalizerTypeId = ContinuationFinalizerTypeId;

class ContinuationFinalizer extends Continuation {
  constructor(finalizer) {
    super();
    this.finalizer = finalizer;
    this._typeId = ContinuationFinalizerTypeId;
  }

}
/**
 * @ets_optimize remove
 */


exports.ContinuationFinalizer = ContinuationFinalizer;

function concrete(_) {//
}

const PipeToTypeId = /*#__PURE__*/Symbol();
exports.PipeToTypeId = PipeToTypeId;

class PipeTo extends Channel {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this._typeId = PipeToTypeId;
  }

}

exports.PipeTo = PipeTo;
const ReadTypeId = /*#__PURE__*/Symbol();
exports.ReadTypeId = ReadTypeId;

class Read extends Channel {
  constructor(more, done) {
    super();
    this.more = more;
    this.done = done;
    this._typeId = ReadTypeId;
  }

}

exports.Read = Read;
const DoneTypeId = /*#__PURE__*/Symbol();
exports.DoneTypeId = DoneTypeId;

class Done extends Channel {
  constructor(terminal) {
    super();
    this.terminal = terminal;
    this._typeId = DoneTypeId;
  }

}

exports.Done = Done;
const HaltTypeId = /*#__PURE__*/Symbol();
exports.HaltTypeId = HaltTypeId;

class Halt extends Channel {
  constructor(error) {
    super();
    this.error = error;
    this._typeId = HaltTypeId;
  }

}

exports.Halt = Halt;
const EffectTypeId = /*#__PURE__*/Symbol();
exports.EffectTypeId = EffectTypeId;

class Effect extends Channel {
  constructor(effect) {
    super();
    this.effect = effect;
    this._typeId = EffectTypeId;
  }

}

exports.Effect = Effect;
const EmitTypeId = /*#__PURE__*/Symbol();
exports.EmitTypeId = EmitTypeId;

class Emit extends Channel {
  constructor(out) {
    super();
    this.out = out;
    this._typeId = EmitTypeId;
  }

}

exports.Emit = Emit;
const EnsuringTypeId = /*#__PURE__*/Symbol();
exports.EnsuringTypeId = EnsuringTypeId;

class Ensuring extends Channel {
  constructor(channel, finalizer) {
    super();
    this.channel = channel;
    this.finalizer = finalizer;
    this._typeId = EnsuringTypeId;
  }

}

exports.Ensuring = Ensuring;
const ConcatAllTypeId = /*#__PURE__*/Symbol();
exports.ConcatAllTypeId = ConcatAllTypeId;

class ConcatAll extends Channel {
  constructor(combineInners, combineAll, value, k) {
    super();
    this.combineInners = combineInners;
    this.combineAll = combineAll;
    this.value = value;
    this.k = k;
    this._typeId = ConcatAllTypeId;
  }

}

exports.ConcatAll = ConcatAll;
const FoldTypeId = /*#__PURE__*/Symbol();
exports.FoldTypeId = FoldTypeId;

class Fold extends Channel {
  constructor(value, k) {
    super();
    this.value = value;
    this.k = k;
    this._typeId = FoldTypeId;
  }

}

exports.Fold = Fold;
const BridgeTypeId = /*#__PURE__*/Symbol();
exports.BridgeTypeId = BridgeTypeId;

class Bridge extends Channel {
  constructor(input, channel) {
    super();
    this.input = input;
    this.channel = channel;
    this._typeId = BridgeTypeId;
  }

}

exports.Bridge = Bridge;
const BracketOutTypeId = /*#__PURE__*/Symbol();
exports.BracketOutTypeId = BracketOutTypeId;

class BracketOut extends Channel {
  constructor(acquire, finalizer) {
    super();
    this.acquire = acquire;
    this.finalizer = finalizer;
    this._typeId = BracketOutTypeId;
  }

}

exports.BracketOut = BracketOut;
const ProvideTypeId = /*#__PURE__*/Symbol();
exports.ProvideTypeId = ProvideTypeId;

class Provide extends Channel {
  constructor(env, channel) {
    super();
    this.env = env;
    this.channel = channel;
    this._typeId = ProvideTypeId;
  }

}

exports.Provide = Provide;
const EffectTotalTypeId = /*#__PURE__*/Symbol();
exports.EffectTotalTypeId = EffectTotalTypeId;

class EffectTotal extends Channel {
  constructor(effect) {
    super();
    this.effect = effect;
    this._typeId = EffectTotalTypeId;
  }

}

exports.EffectTotal = EffectTotal;
const EffectSuspendTotalTypeId = /*#__PURE__*/Symbol();
exports.EffectSuspendTotalTypeId = EffectSuspendTotalTypeId;

class EffectSuspendTotal extends Channel {
  constructor(effect) {
    super();
    this.effect = effect;
    this._typeId = EffectSuspendTotalTypeId;
  }

}

exports.EffectSuspendTotal = EffectSuspendTotal;
//# sourceMappingURL=primitives.js.map