import * as Clock from "../Clock/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as E from "../Either/index.js";
import * as Random from "../Random/index.js";
import * as Decision from "./Decision/index.js";
import * as Driver from "./Driver/index.js";
import * as T from "./effect.js";
/**
 * A `Schedule< Env, In, Out>` defines a recurring schedule, which consumes values of type `In`, and
 * which returns values of type `Out`.
 *
 * Schedules are defined as a possibly infinite set of intervals spread out over time. Each
 * interval defines a window in which recurrence is possible.
 *
 * When schedules are used to repeat or retry effects, the starting boundary of each interval
 * produced by a schedule is used as the moment when the effect will be executed again.
 *
 * Schedules compose in the following primary ways:
 *
 *  * Union. This performs the union of the intervals of two schedules.
 *  * Intersection. This performs the intersection of the intervals of two schedules.
 *  * Sequence. This concatenates the intervals of one schedule onto another.
 *
 * In addition, schedule inputs and outputs can be transformed, filtered (to terminate a
 * schedule early in response to some input or output), and so forth.
 *
 * A variety of other operators exist for transforming and combining schedules, and the companion
 * object for `Schedule` contains all common types of schedules, both for performing retrying, as
 * well as performing repetition.
 */
export declare class Schedule<Env, In, Out> {
    readonly step: Decision.StepFunction<Env, In, Out>;
    constructor(step: Decision.StepFunction<Env, In, Out>);
    /**
     * Returns a new schedule that performs a geometric intersection on the intervals defined
     * by both schedules.
     */
    readonly ["&&"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
    /**
     * The same as `&&`, but ignores the left output.
     */
    readonly ["***"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, Tp.Tuple<[In, In1]>, Tp.Tuple<[Out, Out1]>>;
    /**
     * The same as `&&`, but ignores the left output.
     */
    readonly ["*>"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, In & In1, Out1>;
    /**
     * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
     * feeding inputs to the specified schedule.
     */
    readonly ["+++"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, E.Either<In, In1>, Out | Out1>;
    /**
     * A symbolic alias for `andThen`.
     */
    readonly ["++"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, In & In1, Out | Out1>;
    /**
     * The same as `&&`, but ignores the right output.
     */
    readonly ["<*"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, In & In1, Out>;
    /**
     * An operator alias for `zip`.
     */
    readonly ["<*>"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
    /**
     * Returns the composition of this schedule and the specified schedule, by piping the output of
     * this one into the input of the other. Effects described by this schedule will always be
     * executed before the effects described by the second schedule.
     */
    readonly ["<<<"]: <Env1, In1>(that: Schedule<Env1, In1, In>) => Schedule<Env & Env1, In1, Out>;
    /**
     * Returns the composition of this schedule and the specified schedule, by piping the output of
     * this one into the input of the other. Effects described by this schedule will always be
     * executed before the effects described by the second schedule.
     */
    readonly [">>>"]: <Env1, Out1>(that: Schedule<Env1, Out, Out1>) => Schedule<Env & Env1, In, Out1>;
    /**
     * Returns a new schedule that performs a geometric union on the intervals defined
     * by both schedules.
     */
    readonly ["||"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
    /**
     * Returns a new schedule that chooses between two schedules with a common output.
     */
    readonly ["|||"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, E.Either<In, In1>, Out | Out1>;
    /**
     * Operator alias for `andThenEither`.
     */
    readonly ["<||>"]: <Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>) => Schedule<Env & Env1, In & In1, E.Either<Out, Out1>>;
}
/**
 * Returns a driver that can be used to step the schedule, appropriately handling sleeping.
 */
export declare function driver<Env, Inp, Out>(self: Schedule<Env, Inp, Out>): T.UIO<Driver.Driver<Clock.HasClock & Env, Inp, Out>>;
/**
 * Returns a new schedule that loops this one continuously, resetting the state
 * when this schedule is done.
 */
export declare function repeat<Env, Inp, Out>(self: Schedule<Env, Inp, Out>): Schedule<Env, Inp, Out>;
/**
 * Returns a new schedule with the given delay added to every update.
 */
export declare function addDelay<Out>(f: (b: Out) => number): <Env, Inp>(self: Schedule<Env, Inp, Out>) => Schedule<Env, Inp, Out>;
/**
 * Returns a new schedule with the given delay added to every update.
 */
export declare function addDelay_<Env, Inp, Out>(self: Schedule<Env, Inp, Out>, f: (b: Out) => number): Schedule<Env, Inp, Out>;
/**
 * Returns a new schedule with the effectfully calculated delay added to every update.
 */
export declare function addDelayM<Out, Env1>(f: (b: Out) => T.Effect<Env1, never, number>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule with the effectfully calculated delay added to every update.
 */
export declare function addDelayM_<Env, In, Out, Env1>(self: Schedule<Env, In, Out>, f: (b: Out) => T.Effect<Env1, never, number>): Schedule<Env & Env1, In, Out>;
/**
 * The same as `andThenEither`, but merges the output.
 */
export declare function andThen<Env1, Out2, In1>(that: Schedule<Env1, In1, Out2>): <In, Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Out2 | Out>;
/**
 * The same as `andThenEither`, but merges the output.
 */
export declare function andThen_<R, B, A, R1, C, A1>(self: Schedule<R, A, B>, that: Schedule<R1, A1, C>): Schedule<R & R1, A & A1, B | C>;
/**
 * Returns a new schedule that maps this schedule to a constant output.
 */
export declare function as<Out2>(o: Out2): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out2>;
/**
 * Returns a new schedule that has both the inputs and outputs of this and the specified
 * schedule.
 */
export declare function bothInOut<Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, Tp.Tuple<[In, In1]>, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that has both the inputs and outputs of this and the specified
 * schedule.
 */
export declare function bothInOut_<Env, In, Out, Env1, In1, Out1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, Tp.Tuple<[In, In1]>, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that has both the inputs and outputs of this and the specified
 * schedule.
 */
export declare function intersection<Env1, Out1, In1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that performs a geometric intersection on the intervals defined
 * by both schedules.
 */
export declare function intersection_<Env, In, Out, Env1, In1, Out1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, In1 & In, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that passes each input and output of this schedule to the spefcified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */
export declare function check<In, Out>(f: (i: In, o: Out) => boolean): <Env>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule that passes each input and output of this schedule to the spefcified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */
export declare function check_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (i: In, o: Out) => boolean): Schedule<Env, In, Out>;
/**
 * Returns a new schedule that passes each input and output of this schedule to the specified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */
export declare function checkM<Env1, In, Out>(test: (i: In, o: Out) => T.Effect<Env1, never, boolean>): <Env>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that passes each input and output of this schedule to the specified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */
export declare function checkM_<In, Env, Env1, Out>(self: Schedule<Env, In, Out>, test: (i: In, o: Out) => T.Effect<Env1, never, boolean>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that first executes this schedule to completion, and then executes the
 * specified schedule to completion.
 */
export declare function andThenEither<Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env2, In & In2, E.Either<Out, Out2>>;
/**
 * Returns a new schedule that first executes this schedule to completion, and then executes the
 * specified schedule to completion.
 */
export declare function andThenEither_<Env2, In2, Out2, Env, Out, In>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>): Schedule<Env & Env2, In & In2, E.Either<Out, Out2>>;
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */
export declare function choose<Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, E.Either<In, In1>, E.Either<Out, Out1>>;
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */
export declare function choose_<Env, In, Out, Env1, In1, Out1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, E.Either<In, In1>, E.Either<Out, Out1>>;
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */
export declare function chooseMerge<Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, E.Either<In, In1>, Out1 | Out>;
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */
export declare function chooseMerge_<Env, In, Out, Env1, In1, Out1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, E.Either<In, In1>, Out | Out1>;
/**
 * Returns a new schedule that collects the outputs of this one into an array.
 */
export declare function collectAll<Env, In, Out>(self: Schedule<Env, In, Out>): Schedule<Env, In, readonly Out[]>;
/**
 * A schedule that recurs anywhere, collecting all inputs into a list.
 */
export declare function collectAllIdentity<A>(): Schedule<unknown, A, readonly A[]>;
/**
 * Returns the composition of this schedule and the specified schedule, by piping the output of
 * this one into the input of the other. Effects described by this schedule will always be
 * executed before the effects described by the second schedule.
 */
export declare function compose<Env1, Out, Out1>(that: Schedule<Env1, Out, Out1>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out1>;
/**
 * Returns the composition of this schedule and the specified schedule, by piping the output of
 * this one into the input of the other. Effects described by this schedule will always be
 * executed before the effects described by the second schedule.
 */
export declare function compose_<Env1, Out1, Env, In, Out>(self: Schedule<Env, In, Out>, that: Schedule<Env1, Out, Out1>): Schedule<Env & Env1, In, Out1>;
/**
 * Returns a new schedule that deals with a narrower class of inputs than this schedule.
 */
export declare function contramap<In, In1>(f: (_: In1) => In): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In1, Out>;
/**
 * Returns a new schedule that deals with a narrower class of inputs than this schedule.
 */
export declare function contramap_<Env, In, Out, In1>(self: Schedule<Env, In, Out>, f: (_: In1) => In): Schedule<Env, In1, Out>;
/**
 * Returns a new schedule with the specified computed delay added before the start
 * of each interval produced by this schedule.
 */
export declare function delayed(f: (d: number) => number): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule with the specified computed delay added before the start
 * of each interval produced by this schedule.
 */
export declare function delayedFrom<Env, In>(schedule: Schedule<Env, In, number>): Schedule<Env, In, number>;
/**
 * Returns a new schedule with the specified computed delay added before the start
 * of each interval produced by this schedule.
 */
export declare function delayed_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (d: number) => number): Schedule<Env, In, Out>;
/**
 * Returns a new schedule with the specified effectfully computed delay added before the start
 * of each interval produced by this schedule.
 */
export declare function delayedM<Env1>(f: (d: number) => T.Effect<Env1, never, number>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule with the specified effectfully computed delay added before the start
 * of each interval produced by this schedule.
 */
export declare function delayedM_<Env, In, Out, Env1>(self: Schedule<Env, In, Out>, f: (d: number) => T.Effect<Env1, never, number>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that contramaps the input and maps the output.
 */
export declare function dimap<In2, In>(f: (i: In2) => In): <Out, Out2>(g: (o: Out) => Out2) => <Env>(self: Schedule<Env, In, Out>) => Schedule<Env, In2, Out2>;
/**
 * Returns a new schedule that contramaps the input and maps the output.
 */
export declare function dimap_<In2, Env, In, Out, Out2>(self: Schedule<Env, In, Out>, f: (i: In2) => In, g: (o: Out) => Out2): Schedule<Env, In2, Out2>;
/**
 * A schedule that can recur one time, the specified amount of time into the future.
 */
export declare function duration(n: number): Schedule<unknown, unknown, number>;
/**
 * A schedule that can recur one time, the specified amount of time into the future.
 */
export declare function durations(n: number, ...rest: number[]): Schedule<unknown, unknown, number>;
/**
 * Returns a new schedule that performs a geometric union on the intervals defined
 * by both schedules.
 */
export declare function union<Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 */
export declare function union_<Env, Out, Env1, In, In1, Out1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 */
export declare function unionWith<Env1, In1, Out1>(that: Schedule<Env1, In1, Out1>, f: (d1: number, d2: number) => number): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 */
export declare function unionWith_<Env, Env1, In, In1, Out, Out1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>, f: (d1: number, d2: number) => number): Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
/**
 * A schedule that occurs everywhere, which returns the total elapsed duration since the
 * first step.
 */
export declare const elapsed: Schedule<unknown, unknown, number>;
/**
 * A schedule that always recurs, but will wait a certain amount between
 * repetitions, given by `base * factor.pow(n)`, where `n` is the number of
 * repetitions so far. Returns the current duration between recurrences.
 */
export declare function exponential(base: number, factor?: number): Schedule<unknown, unknown, number>;
/**
 * A schedule that always recurs, increasing delays by summing the
 * preceding two delays (similar to the fibonacci sequence). Returns the
 * current duration between recurrences.
 */
export declare function fibonacci(one: number): Schedule<unknown, unknown, number>;
/**
 * A schedule that recurs on a fixed interval. Returns the number of
 * repetitions of the schedule so far.
 *
 * If the action run between updates takes longer than the interval, then the
 * action will be run immediately, but re-runs will not "pile up".
 *
 * <pre>
 * |-----interval-----|-----interval-----|-----interval-----|
 * |---------action--------||action|-----|action|-----------|
 * </pre>
 */
export declare function fixed(interval: number): Schedule<unknown, unknown, number>;
/**
 * A schedule that always recurs, mapping input values through the
 * specified function.
 */
export declare function fromFunction<A, B>(f: (a: A) => B): Schedule<unknown, A, B>;
/**
 * A schedule that always recurs, which counts the number of recurrances.
 */
export declare const count: Schedule<unknown, unknown, number>;
/**
 * Returns a new schedule that will run the specified finalizer as soon as the schedule is
 * complete. Note that unlike `Effect#ensuring`, this method does not guarantee the finalizer
 * will be run. The `Schedule` may not initialize or the driver of the schedule may not run
 * to completion. However, if the `Schedule` ever decides not to continue, then the
 * finalizer will be run.
 */
export declare function ensuring<Env1, X>(finalizer: T.Effect<Env1, never, X>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that will run the specified finalizer as soon as the schedule is
 * complete. Note that unlike `Effect#ensuring`, this method does not guarantee the finalizer
 * will be run. The `Schedule` may not initialize or the driver of the schedule may not run
 * to completion. However, if the `Schedule` ever decides not to continue, then the
 * finalizer will be run.
 */
export declare function ensuring_<Env1, Env, In, Out, X>(self: Schedule<Env, In, Out>, finalizer: T.Effect<Env1, never, X>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that packs the input and output of this schedule into the first
 * element of a tuple. This allows carrying information through this schedule.
 */
export declare function first<X>(): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, Tp.Tuple<[In, X]>, Tp.Tuple<[Out, X]>>;
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */
export declare function fold<Z>(z: Z): <Out>(f: (z: Z, o: Out) => Z) => <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Z>;
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */
export declare function fold_<Env, In, Out, Z>(self: Schedule<Env, In, Out>, z: Z, f: (z: Z, o: Out) => Z): Schedule<Env, In, Z>;
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */
export declare function foldM<Z>(z: Z): <Env1, Out>(f: (z: Z, o: Out) => T.Effect<Env1, never, Z>) => <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Z>;
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */
export declare function foldM_<Env, In, Out, Z, Env1>(self: Schedule<Env, In, Out>, z: Z, f: (z: Z, o: Out) => T.Effect<Env1, never, Z>): Schedule<Env & Env1, In, Z>;
/**
 * A schedule that recurs forever, producing a count of repeats: 0, 1, 2, ...
 */
export declare const forever: Schedule<unknown, unknown, number>;
/**
 * A schedule that always recurs, which returns inputs as outputs.
 */
export declare function identity<A>(): Schedule<unknown, A, A>;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as both schedules want to continue and
 * merging the next intervals according to the specified merge function.
 */
export declare function intersectWith_<Env, In, Out, Env2, In2, Out2>(self: Schedule<Env, In, Out>, that: Schedule<Env2, In2, Out2>, f: (selfInterval: number, thatInterval: number) => number): Schedule<Env & Env2, In & In2, Tp.Tuple<[Out, Out2]>>;
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as both schedules want to continue and
 * merging the next intervals according to the specified merge function.
 */
export declare function intersectWith<Env2, In2, Out2>(that: Schedule<Env2, In2, Out2>, f: (selfInterval: number, thatInterval: number) => number): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env2, In & In2, Tp.Tuple<[Out, Out2]>>;
/**
 * Returns a new schedule that randomly modifies the size of the intervals of this schedule.
 */
export declare function jittered({ max, min }?: {
    min?: number;
    max?: number;
}): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & import("../Has/index.js").Has<Random.Random>, In, Out>;
/**
 * Returns a new schedule that randomly modifies the size of the intervals of this schedule.
 */
export declare function jittered_<Env, In, Out>(self: Schedule<Env, In, Out>, { max, min }?: {
    min?: number;
    max?: number;
}): Schedule<Env & import("../Has/index.js").Has<Random.Random>, In, Out>;
/**
 * A schedule that always recurs, but will repeat on a linear time
 * interval, given by `base * n` where `n` is the number of
 * repetitions so far. Returns the current duration between recurrences.
 */
export declare function linear(base: number): Schedule<unknown, unknown, number>;
/**
 * A schedule that recurs one time.
 */
export declare const once: Schedule<unknown, unknown, void>;
/**
 * Returns a new schedule that makes this schedule available on the `Left` side of an `Either`
 * input, allowing propagating some type `X` through this channel on demand.
 */
export declare function left<X>(): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, E.Either<In, X>, E.Either<Out, X>>;
/**
 * Returns a new schedule that maps the output of this schedule through the specified
 * effectful function.
 */
export declare function map<Out, Out2>(f: (o: Out) => Out2): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out2>;
/**
 * Returns a new schedule that maps the output of this schedule through the specified
 * effectful function.
 */
export declare function map_<Env, In, Out, Out2>(self: Schedule<Env, In, Out>, f: (o: Out) => Out2): Schedule<Env, In, Out2>;
/**
 * Returns a new schedule that maps the output of this schedule through the specified function.
 */
export declare function mapM<Out, Env1, Out2>(f: (o: Out) => T.Effect<Env1, never, Out2>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out2>;
/**
 * Returns a new schedule that maps the output of this schedule through the specified function.
 */
export declare function mapM_<Env, In, Out, Env1, Out2>(self: Schedule<Env, In, Out>, f: (o: Out) => T.Effect<Env1, never, Out2>): Schedule<Env & Env1, In, Out2>;
/**
 * Returns a new schedule that modifies the delay using the specified
 * effectual function.
 */
export declare function modifyDelayM<Out, R1>(f: (o: Out, d: number) => T.Effect<R1, never, number>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & R1, In, Out>;
/**
 * Returns a new schedule that modifies the delay using the specified
 * effectual function.
 */
export declare function modifyDelayM_<Env, In, Out, R1>(self: Schedule<Env, In, Out>, f: (o: Out, d: number) => T.Effect<R1, never, number>): Schedule<Env & R1, In, Out>;
/**
 * Returns a new schedule that modifies the delay using the specified
 * function.
 */
export declare function modifyDelay<Out>(f: (o: Out, d: number) => number): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule that modifies the delay using the specified
 * function.
 */
export declare function modifyDelay_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (o: Out, d: number) => number): Schedule<Env, In, Out>;
/**
 * Returns a new schedule that applies the current one but runs the specified effect
 * for every decision of this schedule. This can be used to create schedules
 * that log failures, decisions, or computed values.
 */
export declare function onDecision_<Env, In, Out, Env1, X>(self: Schedule<Env, In, Out>, f: (d: Decision.Decision<Env, In, Out>) => T.Effect<Env1, never, X>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that applies the current one but runs the specified effect
 * for every decision of this schedule. This can be used to create schedules
 * that log failures, decisions, or computed values.
 */
export declare function onDecision<Env, In, Out, Env1, X>(f: (d: Decision.Decision<Env, In, Out>) => T.Effect<Env1, never, X>): (self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule with its environment provided to it, so the resulting
 * schedule does not require any environment.
 */
export declare function provideAll<Env>(env: Env): <In, Out>(self: Schedule<Env, In, Out>) => Schedule<unknown, In, Out>;
/**
 * Returns a new schedule with its environment provided to it, so the resulting
 * schedule does not require any environment.
 */
export declare function provideAll_<Env, In, Out>(self: Schedule<Env, In, Out>, env: Env): Schedule<unknown, In, Out>;
/**
 * Returns a new schedule with part of its environment provided to it, so the
 * resulting schedule does not require any environment.
 */
export declare function provideSome<Env1, Env>(env: (e: Env1) => Env): <In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env1, In, Out>;
/**
 * Returns a new schedule with part of its environment provided to it, so the
 * resulting schedule does not require any environment.
 */
export declare function provideSome_<Env1, Env, In, Out>(self: Schedule<Env, In, Out>, env: (e: Env1) => Env): Schedule<Env1, In, Out>;
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */
export declare function reconsider<Env, In, Out, Out2>(f: (_: Decision.Decision<Env, In, Out>) => E.Either<Out2, [Out2, number]>): (self: Schedule<Env, In, Out>) => Schedule<Env, In, Out2>;
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */
export declare function reconsider_<Env, In, Out, Out2>(self: Schedule<Env, In, Out>, f: (_: Decision.Decision<Env, In, Out>) => E.Either<Out2, [Out2, number]>): Schedule<Env, In, Out2>;
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */
export declare function reconsiderM<Env, In, Out, Env1, Out2>(f: (_: Decision.Decision<Env, In, Out>) => T.Effect<Env1, never, E.Either<Out2, [Out2, number]>>): (self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out2>;
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */
export declare function reconsiderM_<Env, In, Out, Env1, Out2>(self: Schedule<Env, In, Out>, f: (_: Decision.Decision<Env, In, Out>) => T.Effect<Env1, never, E.Either<Out2, [Out2, number]>>): Schedule<Env & Env1, In, Out2>;
/**
 * Returns a new schedule that outputs the number of repetitions of this one.
 */
export declare function repetitions<Env, In, Out>(self: Schedule<Env, In, Out>): Schedule<Env, In, number>;
/**
 * Return a new schedule that automatically resets the schedule to its initial state
 * after some time of inactivity defined by `duration`.
 */
export declare function resetAfter(duration: number): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Resets the schedule when the specified predicate on the schedule output evaluates to true.
 */
export declare function resetWhen<Out>(f: (o: Out) => boolean): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Resets the schedule when the specified predicate on the schedule output evaluates to true.
 */
export declare function resetWhen_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (o: Out) => boolean): Schedule<Env, In, Out>;
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */
export declare function recurWhile<A>(f: (a: A) => boolean): Schedule<unknown, A, A>;
/**
 * A schedule that recurs for as long as the effectful predicate evaluates to true.
 */
export declare function recurWhileM<Env, A>(f: (a: A) => T.Effect<Env, never, boolean>): Schedule<Env, A, A>;
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */
export declare function recurWhileEquals<A>(a: A): Schedule<unknown, A, A>;
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */
export declare function recurUntil<A>(f: (a: A) => boolean): Schedule<unknown, A, A>;
/**
 * A schedule that recurs for as long as the effectful predicate evaluates to true.
 */
export declare function recurUntilM<Env, A>(f: (a: A) => T.Effect<Env, never, boolean>): Schedule<Env, A, A>;
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */
export declare function recurUntilEquals<A>(a: A): Schedule<unknown, A, A>;
/**
 * A schedule spanning all time, which can be stepped only the specified number of times before
 * it terminates.
 */
export declare function recurs(n: number): Schedule<unknown, unknown, number>;
/**
 * Returns a new schedule that makes this schedule available on the `Right` side of an `Either`
 * input, allowing propagating some type `X` through this channel on demand.
 */
export declare function right<X>(): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, E.Either<X, In>, E.Either<X, Out>>;
/**
 * Runs a schedule using the provided inputs, and collects all outputs.
 */
export declare function run<In>(now: number, i: Iterable<In>): <Env, Out>(self: Schedule<Env, In, Out>) => T.Effect<Env, never, readonly Out[]>;
/**
 * Runs a schedule using the provided inputs, and collects all outputs.
 */
export declare function run_<Env, In, Out>(self: Schedule<Env, In, Out>, now: number, i: Iterable<In>): T.Effect<Env, never, readonly Out[]>;
/**
 * Returns a new schedule that packs the input and output of this schedule into the second
 * element of a tuple. This allows carrying information through this schedule.
 */
export declare function second<X>(): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, Tp.Tuple<[X, In]>, Tp.Tuple<[X, Out]>>;
/**
 * Returns a schedule that recurs continuously, each repetition spaced the specified duration
 * from the last run.
 */
export declare function spaced(duration: number): Schedule<unknown, unknown, number>;
/**
 * A schedule that does not recur, it just stops.
 */
export declare const stop: Schedule<unknown, unknown, void>;
/**
 * Returns a schedule that repeats one time, producing the specified constant value.
 */
export declare function succeed<A>(a: A): Schedule<unknown, unknown, A>;
/**
 * Returns a new schedule that effectfully processes every input to this schedule.
 */
export declare function tapInput_<Env, In, Out, Env1, X>(self: Schedule<Env, In, Out>, f: (i: In) => T.Effect<Env1, never, X>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that effectfully processes every input to this schedule.
 */
export declare function tapInput<In, Env1, X>(f: (i: In) => T.Effect<Env1, never, X>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that effectfully processes every output from this schedule.
 */
export declare function tapOutput<Env1, Out, X>(f: (o: Out) => T.Effect<Env1, never, X>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that effectfully processes every output from this schedule.
 */
export declare function tapOutput_<Env, In, Out, Env1, X>(self: Schedule<Env, In, Out>, f: (o: Out) => T.Effect<Env1, never, X>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that maps the output of this schedule to unit.
 */
export declare function unit<Env, In, Out, Env1>(self: Schedule<Env, In, Out>): Schedule<Env & Env1, In, void>;
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */
export declare function untilInput<In>(f: (i: In) => boolean): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */
export declare function untilInput_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (i: In) => boolean): Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues until the specified effectful predicate on the input
 * evaluates to true.
 */
export declare function untilInputM<Env1, In>(f: (i: In) => T.Effect<Env1, never, boolean>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that continues until the specified effectful predicate on the input
 * evaluates to true.
 */
export declare function untilInputM_<Env1, Env, In, Out>(self: Schedule<Env, In, Out>, f: (i: In) => T.Effect<Env1, never, boolean>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */
export declare function untilOutput<Out>(f: (o: Out) => boolean): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */
export declare function untilOutput_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (o: Out) => boolean): Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */
export declare function untilOutputM<Out, Env1>(f: (o: Out) => T.Effect<Env1, never, boolean>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */
export declare function untilOutputM_<Env, In, Out, Env1>(self: Schedule<Env, In, Out>, f: (o: Out) => T.Effect<Env1, never, boolean>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified predicate on the input
 * evaluates to true.
 */
export declare function whileInput<In>(f: (i: In) => boolean): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified predicate on the input
 * evaluates to true.
 */
export declare function whileInput_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (i: In) => boolean): Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * input evaluates to true.
 */
export declare function whileInputM<Env1, In>(f: (i: In) => T.Effect<Env1, never, boolean>): <Env, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * input evaluates to true.
 */
export declare function whileInputM_<Env1, Env, In, Out>(self: Schedule<Env, In, Out>, f: (i: In) => T.Effect<Env1, never, boolean>): Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified predicate on the output
 * evaluates to true.
 */
export declare function whileOutput<Out>(f: (o: Out) => boolean): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified predicate on the output
 * evaluates to true.
 */
export declare function whileOutput_<Env, In, Out>(self: Schedule<Env, In, Out>, f: (o: Out) => boolean): Schedule<Env, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * output evaluates to true.
 */
export declare function whileOutputM<Out, Env1>(f: (o: Out) => T.Effect<Env1, never, boolean>): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In, Out>;
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * output evaluates to true.
 */
export declare function whileOutputM_<Env, In, Out, Env1>(self: Schedule<Env, In, Out>, f: (o: Out) => T.Effect<Env1, never, boolean>): Schedule<Env & Env1, In, Out>;
/**
 * A schedule that divides the timeline to `interval`-long windows, and sleeps
 * until the nearest window boundary every time it recurs.
 *
 * For example, `windowed(10_000)` would produce a schedule as follows:
 * <pre>
 *      10s        10s        10s       10s
 * |----------|----------|----------|----------|
 * |action------|sleep---|act|-sleep|action----|
 * </pre>
 */
export declare function windowed(interval: number): Schedule<unknown, unknown, number>;
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */
export declare function unfold<A>(f: (a: A) => A): (a: A) => Schedule<unknown, unknown, A>;
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */
export declare function unfold_<A>(a: A, f: (a: A) => A): Schedule<unknown, unknown, A>;
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */
export declare function unfoldM<Env, A>(f: (a: A) => T.Effect<Env, never, A>): (a: A) => Schedule<Env, unknown, A>;
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */
export declare function unfoldM_<Env, A>(a: A, f: (a: A) => T.Effect<Env, never, A>): Schedule<Env, unknown, A>;
/**
 * Returns a new schedule that performs a geometric intersection on the intervals defined
 * by both schedules.
 */
export declare function zip_<Env, In, Out, Env1, Out1, In1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
/**
 * Returns a new schedule that performs a geometric intersection on the intervals defined
 * by both schedules.
 */
export declare function zip<Env1, Out1, In1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Tp.Tuple<[Out, Out1]>>;
/**
 * Same as zip but ignores the right output.
 */
export declare function zipLeft<Env1, Out1, In1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Out>;
/**
 * Same as zip but ignores the right output.
 */
export declare function zipLeft_<Env, In, Out, Env1, Out1, In1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, In & In1, Out>;
/**
 * Same as zip but ignores the right output.
 */
export declare function zipRight<Env1, Out1, In1>(that: Schedule<Env1, In1, Out1>): <Env, In, Out>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Out1>;
/**
 * Same as zip but ignores the right output.
 */
export declare function zipRight_<Env, In, Out, Env1, Out1, In1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>): Schedule<Env & Env1, In & In1, Out1>;
/**
 * Equivalent to `zip` followed by `map`.
 */
export declare function zipWith<Out, Env1, Out1, Out2, In1>(that: Schedule<Env1, In1, Out1>, f: (o: Out, o1: Out1) => Out2): <Env, In>(self: Schedule<Env, In, Out>) => Schedule<Env & Env1, In & In1, Out2>;
/**
 * Equivalent to `zip` followed by `map`.
 */
export declare function zipWith_<Env, In, Out, Env1, Out1, Out2, In1>(self: Schedule<Env, In, Out>, that: Schedule<Env1, In1, Out1>, f: (o: Out, o1: Out1) => Out2): Schedule<Env & Env1, In & In1, Out2>;
//# sourceMappingURL=schedule.d.ts.map