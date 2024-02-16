import "../../../../Operator/index.js";
import * as Cause from "../../../../Cause/index.js";
import * as T from "../../../../Effect/index.js";
import * as E from "../../../../Either/index.js";
import * as Exit from "../../../../Exit/index.js";
import * as P from "../../../../Promise/index.js";
import * as Ref from "../../../../Ref/index.js";
import * as IQ from "../../../../Support/ImmutableQueue/index.js";
/**
 * Producer-side view of `SingleProducerAsyncInput` for variance purposes.
 */
export interface AsyncInputProducer<Err, Elem, Done> {
    emit(el: Elem): T.UIO<unknown>;
    done(a: Done): T.UIO<unknown>;
    error(cause: Cause.Cause<Err>): T.UIO<unknown>;
    awaitRead: T.UIO<unknown>;
}
/**
 * Consumer-side view of `SingleProducerAsyncInput` for variance purposes.
 */
export interface AsyncInputConsumer<Err, Elem, Done> {
    takeWith<A>(onError: (cause: Cause.Cause<Err>) => A, onElement: (element: Elem) => A, onDone: (done: Done) => A): T.UIO<A>;
}
export declare const DoneTypeId: unique symbol;
export declare type DoneTypeId = typeof DoneTypeId;
export declare class StateDone<Elem> {
    readonly a: Elem;
    readonly _typeId: DoneTypeId;
    constructor(a: Elem);
}
export declare const ErrorTypeId: unique symbol;
export declare type ErrorTypeId = typeof ErrorTypeId;
export declare class StateError<Err> {
    readonly cause: Cause.Cause<Err>;
    readonly _typeId: ErrorTypeId;
    constructor(cause: Cause.Cause<Err>);
}
export declare const EmptyTypeId: unique symbol;
export declare type EmptyTypeId = typeof EmptyTypeId;
export declare class StateEmpty {
    readonly notifyProducer: P.Promise<never, void>;
    readonly _typeId: EmptyTypeId;
    constructor(notifyProducer: P.Promise<never, void>);
}
export declare const EmitTypeId: unique symbol;
export declare type EmitTypeId = typeof EmitTypeId;
export declare class StateEmit<Err, Elem, Done> {
    readonly notifyConsumers: IQ.ImmutableQueue<P.Promise<Err, E.Either<Done, Elem>>>;
    readonly _typeId: EmitTypeId;
    constructor(notifyConsumers: IQ.ImmutableQueue<P.Promise<Err, E.Either<Done, Elem>>>);
}
export declare type State<Err, Elem, Done> = StateEmpty | StateEmit<Err, Elem, Done> | StateError<Err> | StateDone<Done>;
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
export declare class SingleProducerAsyncInput<Err, Elem, Done> implements AsyncInputProducer<Err, Elem, Done>, AsyncInputConsumer<Err, Elem, Done> {
    readonly ref: Ref.Ref<State<Err, Elem, Done>>;
    constructor(ref: Ref.Ref<State<Err, Elem, Done>>);
    emit(el: Elem): T.UIO<unknown>;
    done(a: Done): T.UIO<unknown>;
    error(cause: Cause.Cause<Err>): T.UIO<unknown>;
    takeWith<X>(onError: (cause: Cause.Cause<Err>) => X, onElement: (element: Elem) => X, onDone: (done: Done) => X): T.UIO<X>;
    take: T.UIO<Exit.Exit<E.Either<Err, Done>, Elem>>;
    close: T.Effect<unknown, never, unknown>;
    awaitRead: T.Effect<unknown, never, void>;
}
/**
 * Creates a SingleProducerAsyncInput
 */
export declare function makeSingleProducerAsyncInput<Err, Elem, Done>(): T.UIO<SingleProducerAsyncInput<Err, Elem, Done>>;
//# sourceMappingURL=producer.d.ts.map