"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateError = exports.StateEmpty = exports.StateEmit = exports.StateDone = exports.SingleProducerAsyncInput = exports.ErrorTypeId = exports.EmptyTypeId = exports.EmitTypeId = exports.DoneTypeId = void 0;
exports.makeSingleProducerAsyncInput = makeSingleProducerAsyncInput;

require("../../../../Operator/index.js");

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Promise/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Ref/index.js"));

var IQ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Support/ImmutableQueue/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const DoneTypeId = /*#__PURE__*/Symbol();
exports.DoneTypeId = DoneTypeId;

class StateDone {
  constructor(a) {
    this.a = a;
    this._typeId = DoneTypeId;
  }

}

exports.StateDone = StateDone;
const ErrorTypeId = /*#__PURE__*/Symbol();
exports.ErrorTypeId = ErrorTypeId;

class StateError {
  constructor(cause) {
    this.cause = cause;
    this._typeId = ErrorTypeId;
  }

}

exports.StateError = StateError;
const EmptyTypeId = /*#__PURE__*/Symbol();
exports.EmptyTypeId = EmptyTypeId;

class StateEmpty {
  constructor(notifyProducer) {
    this.notifyProducer = notifyProducer;
    this._typeId = EmptyTypeId;
  }

}

exports.StateEmpty = StateEmpty;
const EmitTypeId = /*#__PURE__*/Symbol();
exports.EmitTypeId = EmitTypeId;

class StateEmit {
  constructor(notifyConsumers) {
    this.notifyConsumers = notifyConsumers;
    this._typeId = EmitTypeId;
  }

}
/**
 * An MVar-like abstraction for sending data to channels asynchronously. Designed
 * for one producer and multiple consumers.
 *
 * Features the following semantics:
 * - Buffer of size 1
 * - When emitting, the producer waits for a consumer to pick up the value
 *   to prevent "reading ahead" too much.
 * - Once an emitted element is read by a consumer, it is cleared from the buffer, so that
 *   at most one consumer sees every emitted element.
 * - When sending a done or error signal, the producer does not wait for a consumer
 *   to pick up the signal. The signal stays in the buffer after being read by a consumer,
 *   so it can be propagated to multiple consumers.
 * - Trying to publish another emit/error/done after an error/done have already been published
 *   results in an interruption.
 */


exports.StateEmit = StateEmit;

class SingleProducerAsyncInput {
  constructor(ref) {
    this.ref = ref;
    this.take = this.takeWith(c => Exit.halt(Cause.map_(c, E.left)), el => Exit.succeed(el), d => Exit.fail(E.right(d)));
    this.close = T.chain_(T.fiberId, id => this.error(Cause.interrupt(id)));
    this.awaitRead = T.flatten(Ref.modify_(this.ref, state => {
      if (state._typeId === EmptyTypeId) {
        return Tp.tuple(P.await(state.notifyProducer), state);
      }

      return Tp.tuple(T.unit, state);
    }));
  }

  emit(el) {
    return T.chain_(P.make(), p => T.flatten(Ref.modify_(this.ref, state => {
      switch (state._typeId) {
        case EmitTypeId:
          {
            const dequeued = state.notifyConsumers.dequeue();

            if (dequeued._tag === "Some") {
              const {
                tuple: [notifyConsumer, notifyConsumers]
              } = dequeued.value;
              return Tp.tuple(P.succeed_(notifyConsumer, E.right(el)), notifyConsumers.size === 0 ? new StateEmpty(p) : new StateEmit(notifyConsumers));
            }

            throw new Error("SingleProducerAsyncInput#emit: queue was empty");
          }

        case ErrorTypeId:
          {
            return Tp.tuple(T.interrupt, state);
          }

        case DoneTypeId:
          {
            return Tp.tuple(T.interrupt, state);
          }

        case EmptyTypeId:
          {
            return Tp.tuple(P.await(state.notifyProducer), state);
          }
      }
    })));
  }

  done(a) {
    return T.chain_(P.make(), p => T.flatten(Ref.modify_(this.ref, state => {
      switch (state._typeId) {
        case EmitTypeId:
          {
            return Tp.tuple(T.forEachUnit_(state.notifyConsumers, p => P.succeed_(p, E.left(a))), new StateDone(a));
          }

        case ErrorTypeId:
          {
            return Tp.tuple(T.interrupt, state);
          }

        case DoneTypeId:
          {
            return Tp.tuple(T.interrupt, state);
          }

        case EmptyTypeId:
          {
            return Tp.tuple(P.await(state.notifyProducer), state);
          }
      }
    })));
  }

  error(cause) {
    return T.chain_(P.make(), p => T.flatten(Ref.modify_(this.ref, state => {
      switch (state._typeId) {
        case EmitTypeId:
          {
            return Tp.tuple(T.forEachUnit_(state.notifyConsumers, p => P.halt_(p, cause)), new StateError(cause));
          }

        case ErrorTypeId:
          {
            return Tp.tuple(T.interrupt, state);
          }

        case DoneTypeId:
          {
            return Tp.tuple(T.interrupt, state);
          }

        case EmptyTypeId:
          {
            return Tp.tuple(P.await(state.notifyProducer), state);
          }
      }
    })));
  }

  takeWith(onError, onElement, onDone) {
    return T.chain_(P.make(), p => T.flatten(Ref.modify_(this.ref, state => {
      switch (state._typeId) {
        case EmitTypeId:
          {
            return Tp.tuple(T.foldCause_(P.await(p), onError, E.fold(onDone, onElement)), new StateEmit(state.notifyConsumers.push(p)));
          }

        case ErrorTypeId:
          {
            return Tp.tuple(T.succeed(onError(state.cause)), state);
          }

        case DoneTypeId:
          {
            return Tp.tuple(T.succeed(onDone(state.a)), state);
          }

        case EmptyTypeId:
          {
            return Tp.tuple(T.zipRight_(P.succeed_(state.notifyProducer, undefined), T.foldCause_(P.await(p), onError, E.fold(onDone, onElement))), new StateEmit(IQ.ImmutableQueue.single(p)));
          }
      }
    })));
  }

}
/**
 * Creates a SingleProducerAsyncInput
 */


exports.SingleProducerAsyncInput = SingleProducerAsyncInput;

function makeSingleProducerAsyncInput() {
  return T.map_(T.chain_(P.make(), p => Ref.makeRef(new StateEmpty(p))), ref => new SingleProducerAsyncInput(ref));
}
//# sourceMappingURL=producer.js.map