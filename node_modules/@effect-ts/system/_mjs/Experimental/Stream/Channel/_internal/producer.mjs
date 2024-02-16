// ets_tracing: off
import "../../../../Operator/index.mjs";
import * as Cause from "../../../../Cause/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as Exit from "../../../../Exit/index.mjs";
import * as P from "../../../../Promise/index.mjs";
import * as Ref from "../../../../Ref/index.mjs";
import * as IQ from "../../../../Support/ImmutableQueue/index.mjs";
export const DoneTypeId = /*#__PURE__*/Symbol();
export class StateDone {
  constructor(a) {
    this.a = a;
    this._typeId = DoneTypeId;
  }

}
export const ErrorTypeId = /*#__PURE__*/Symbol();
export class StateError {
  constructor(cause) {
    this.cause = cause;
    this._typeId = ErrorTypeId;
  }

}
export const EmptyTypeId = /*#__PURE__*/Symbol();
export class StateEmpty {
  constructor(notifyProducer) {
    this.notifyProducer = notifyProducer;
    this._typeId = EmptyTypeId;
  }

}
export const EmitTypeId = /*#__PURE__*/Symbol();
export class StateEmit {
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

export class SingleProducerAsyncInput {
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

export function makeSingleProducerAsyncInput() {
  return T.map_(T.chain_(P.make(), p => Ref.makeRef(new StateEmpty(p))), ref => new SingleProducerAsyncInput(ref));
}
//# sourceMappingURL=producer.mjs.map