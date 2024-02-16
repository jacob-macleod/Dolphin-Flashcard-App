// ets_tracing: off
import * as Clock from "../Clock/index.mjs";
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as L from "../Collections/Immutable/List/index.mjs";
import * as NA from "../Collections/Immutable/NonEmptyArray/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { pipe, tuple } from "../Function/index.mjs";
import * as NoSuchElementException from "../GlobalExceptions/index.mjs";
import * as O from "../Option/index.mjs";
import * as Random from "../Random/index.mjs";
import * as R from "../Ref/index.mjs";
import * as Decision from "./Decision/index.mjs";
import * as Driver from "./Driver/index.mjs";
import * as T from "./effect.mjs";
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

export class Schedule {
  constructor(step) {
    this.step = step;
    /**
     * Returns a new schedule that performs a geometric intersection on the intervals defined
     * by both schedules.
     */

    this["&&"] = that => intersection_(this, that);
    /**
     * The same as `&&`, but ignores the left output.
     */


    this["***"] = that => bothInOut_(this, that);
    /**
     * The same as `&&`, but ignores the left output.
     */


    this["*>"] = that => map_(this["&&"](that), _ => _.get(1));
    /**
     * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
     * feeding inputs to the specified schedule.
     */


    this["+++"] = that => chooseMerge_(this, that);
    /**
     * A symbolic alias for `andThen`.
     */


    this["++"] = that => andThen_(this, that);
    /**
     * The same as `&&`, but ignores the right output.
     */


    this["<*"] = that => map_(this["&&"](that), _ => _.get(0));
    /**
     * An operator alias for `zip`.
     */


    this["<*>"] = that => zip_(this, that);
    /**
     * Returns the composition of this schedule and the specified schedule, by piping the output of
     * this one into the input of the other. Effects described by this schedule will always be
     * executed before the effects described by the second schedule.
     */


    this["<<<"] = that => compose_(that, this);
    /**
     * Returns the composition of this schedule and the specified schedule, by piping the output of
     * this one into the input of the other. Effects described by this schedule will always be
     * executed before the effects described by the second schedule.
     */


    this[">>>"] = that => compose_(this, that);
    /**
     * Returns a new schedule that performs a geometric union on the intervals defined
     * by both schedules.
     */


    this["||"] = that => union_(this, that);
    /**
     * Returns a new schedule that chooses between two schedules with a common output.
     */


    this["|||"] = that => chooseMerge_(this, that);
    /**
     * Operator alias for `andThenEither`.
     */


    this["<||>"] = that => andThenEither_(this, that);
  }

}
/**
 * Returns a driver that can be used to step the schedule, appropriately handling sleeping.
 */

export function driver(self) {
  return T.map_(R.makeRef([O.none, self.step]), ref => {
    const reset = ref.set([O.none, self.step]);
    const last = T.chain_(ref.get, ([o, _]) => O.fold_(o, () => T.fail(new NoSuchElementException.NoSuchElementException()), b => T.succeed(b)));

    const next = i => T.map_(T.bind_(T.bind_(T.bind_(T.bind_(T.do, "step", () => T.map_(ref.get, ([_, o]) => o)), "now", () => Clock.currentTime), "dec", ({
      now,
      step
    }) => step(now, i)), "v", ({
      dec,
      now
    }) => {
      switch (dec._tag) {
        case "Done":
          {
            return T.chain_(ref.set([O.some(dec.out), Decision.done(dec.out)]), () => T.fail(O.none));
          }

        case "Continue":
          {
            return T.map_(T.chain_(T.map_(ref.set([O.some(dec.out), dec.next]), () => dec.interval - now), s => s > 0 ? T.sleep(s) : T.unit), () => dec.out);
          }
      }
    }), ({
      v
    }) => v);

    return new Driver.Driver(next, last, reset);
  });
}

function repeatLoop(init, self = init) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return repeatLoop(init, self)(now, i);
        }

      case "Continue":
        {
          return T.succeed(Decision.makeContinue(d.out, d.interval, repeatLoop(init, d.next)));
        }
    }
  });
}
/**
 * Returns a new schedule that loops this one continuously, resetting the state
 * when this schedule is done.
 */


export function repeat(self) {
  return new Schedule(repeatLoop(self.step));
}
/**
 * Returns a new schedule with the given delay added to every update.
 */

export function addDelay(f) {
  return self => addDelayM_(self, b => T.succeed(f(b)));
}
/**
 * Returns a new schedule with the given delay added to every update.
 */

export function addDelay_(self, f) {
  return addDelayM_(self, b => T.succeed(f(b)));
}
/**
 * Returns a new schedule with the effectfully calculated delay added to every update.
 */

export function addDelayM(f) {
  return self => addDelayM_(self, f);
}
/**
 * Returns a new schedule with the effectfully calculated delay added to every update.
 */

export function addDelayM_(self, f) {
  return modifyDelayM_(self, (o, d) => T.map_(f(o), i => i + d));
}
/**
 * The same as `andThenEither`, but merges the output.
 */

export function andThen(that) {
  return self => andThen_(self, that);
}
/**
 * The same as `andThenEither`, but merges the output.
 */

export function andThen_(self, that) {
  return map_(andThenEither_(self, that), a => a._tag === "Left" ? a.left : a.right);
}
/**
 * Returns a new schedule that maps this schedule to a constant output.
 */

export function as(o) {
  return self => map_(self, () => o);
}

function bothLoop(self, that) {
  return (now, t) => {
    const {
      tuple: [in1, in2]
    } = t;
    return T.zipWith_(self(now, in1), that(now, in2), (d1, d2) => {
      switch (d1._tag) {
        case "Done":
          {
            switch (d2._tag) {
              case "Done":
                {
                  return Decision.makeDone(Tp.tuple(d1.out, d2.out));
                }

              case "Continue":
                {
                  return Decision.makeDone(Tp.tuple(d1.out, d2.out));
                }
            }
          }

        case "Continue":
          {
            switch (d2._tag) {
              case "Done":
                {
                  return Decision.makeDone(Tp.tuple(d1.out, d2.out));
                }

              case "Continue":
                {
                  return Decision.makeContinue(Tp.tuple(d1.out, d2.out), Math.min(d1.interval, d2.interval), bothLoop(d1.next, d2.next));
                }
            }
          }
      }
    });
  };
}
/**
 * Returns a new schedule that has both the inputs and outputs of this and the specified
 * schedule.
 */


export function bothInOut(that) {
  return self => new Schedule(bothLoop(self.step, that.step));
}
/**
 * Returns a new schedule that has both the inputs and outputs of this and the specified
 * schedule.
 */

export function bothInOut_(self, that) {
  return new Schedule(bothLoop(self.step, that.step));
}
/**
 * Returns a new schedule that has both the inputs and outputs of this and the specified
 * schedule.
 */

export function intersection(that) {
  return self => intersection_(self, that);
}
/**
 * Returns a new schedule that performs a geometric intersection on the intervals defined
 * by both schedules.
 */

export function intersection_(self, that) {
  return intersectWith_(self, that, (l, r) => Math.max(l, r));
}
/**
 * Returns a new schedule that passes each input and output of this schedule to the spefcified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */

export function check(f) {
  return self => check_(self, f);
}
/**
 * Returns a new schedule that passes each input and output of this schedule to the spefcified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */

export function check_(self, f) {
  return checkM_(self, (i, o) => T.succeed(f(i, o)));
}

function checkMLoop(self, test) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.succeed(Decision.makeDone(d.out));
        }

      case "Continue":
        {
          return T.map_(test(i, d.out), b => b ? Decision.makeContinue(d.out, d.interval, checkMLoop(d.next, test)) : Decision.makeDone(d.out));
        }
    }
  });
}
/**
 * Returns a new schedule that passes each input and output of this schedule to the specified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */


export function checkM(test) {
  return self => new Schedule(checkMLoop(self.step, test));
}
/**
 * Returns a new schedule that passes each input and output of this schedule to the specified
 * function, and then determines whether or not to continue based on the return value of the
 * function.
 */

export function checkM_(self, test) {
  return new Schedule(checkMLoop(self.step, test));
}
/**
 * Returns a new schedule that first executes this schedule to completion, and then executes the
 * specified schedule to completion.
 */

export function andThenEither(that) {
  return self => andThenEither_(self, that);
}

function andThenEitherLoop(self, that, onLeft) {
  return (now, i) => {
    if (onLeft) {
      return T.chain_(self(now, i), d => {
        switch (d._tag) {
          case "Continue":
            {
              return T.succeed(Decision.makeContinue(E.left(d.out), d.interval, andThenEitherLoop(d.next, that, true)));
            }

          case "Done":
            {
              return andThenEitherLoop(self, that, false)(now, i);
            }
        }
      });
    } else {
      return T.map_(that(now, i), d => {
        switch (d._tag) {
          case "Done":
            {
              return Decision.makeDone(E.right(d.out));
            }

          case "Continue":
            {
              return Decision.makeContinue(E.right(d.out), d.interval, andThenEitherLoop(self, d.next, false));
            }
        }
      });
    }
  };
}
/**
 * Returns a new schedule that first executes this schedule to completion, and then executes the
 * specified schedule to completion.
 */


export function andThenEither_(self, that) {
  return new Schedule(andThenEitherLoop(self.step, that.step, true));
}

function chooseLoop(self, that) {
  return (now, either) => E.fold_(either, i => T.map_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return Decision.makeDone(E.left(d.out));
        }

      case "Continue":
        {
          return Decision.makeContinue(E.left(d.out), d.interval, chooseLoop(d.next, that));
        }
    }
  }), i2 => T.map_(that(now, i2), d => {
    switch (d._tag) {
      case "Done":
        {
          return Decision.makeDone(E.right(d.out));
        }

      case "Continue":
        {
          return Decision.makeContinue(E.right(d.out), d.interval, chooseLoop(self, d.next));
        }
    }
  }));
}
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */


export function choose(that) {
  return self => choose_(self, that);
}
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */

export function choose_(self, that) {
  return new Schedule(chooseLoop(self.step, that.step));
}
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */

export function chooseMerge(that) {
  return self => chooseMerge_(self, that);
}
/**
 * Returns a new schedule that allows choosing between feeding inputs to this schedule, or
 * feeding inputs to the specified schedule.
 */

export function chooseMerge_(self, that) {
  return map_(choose_(self, that), E.merge);
}
/**
 * Returns a new schedule that collects the outputs of this one into an array.
 */

export function collectAll(self) {
  return map_(fold_(self, L.empty(), (xs, x) => L.append_(xs, x)), L.toArray);
}
/**
 * A schedule that recurs anywhere, collecting all inputs into a list.
 */

export function collectAllIdentity() {
  return collectAll(identity());
}

function composeLoop(self, that) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.map_(that(now, d.out), Decision.toDone);
        }

      case "Continue":
        {
          return T.map_(that(now, d.out), d2 => {
            switch (d2._tag) {
              case "Done":
                {
                  return Decision.makeDone(d2.out);
                }

              case "Continue":
                {
                  return Decision.makeContinue(d2.out, Math.max(d.interval, d2.interval), composeLoop(d.next, d2.next));
                }
            }
          });
        }
    }
  });
}
/**
 * Returns the composition of this schedule and the specified schedule, by piping the output of
 * this one into the input of the other. Effects described by this schedule will always be
 * executed before the effects described by the second schedule.
 */


export function compose(that) {
  return self => compose_(self, that);
}
/**
 * Returns the composition of this schedule and the specified schedule, by piping the output of
 * this one into the input of the other. Effects described by this schedule will always be
 * executed before the effects described by the second schedule.
 */

export function compose_(self, that) {
  return new Schedule(composeLoop(self.step, that.step));
}

function intersectWithLoop(self, that, f) {
  return (now, i) => {
    const left = self(now, i);
    const right = that(now, i);
    return T.zipWith_(left, right, (l, r) => {
      switch (l._tag) {
        case "Done":
          {
            switch (r._tag) {
              case "Done":
                {
                  return Decision.makeDone(Tp.tuple(l.out, r.out));
                }

              case "Continue":
                {
                  return Decision.makeDone(Tp.tuple(l.out, r.out));
                }
            }
          }

        case "Continue":
          {
            switch (r._tag) {
              case "Done":
                {
                  return Decision.makeDone(Tp.tuple(l.out, r.out));
                }

              case "Continue":
                {
                  return Decision.makeContinue(Tp.tuple(l.out, r.out), f(l.interval, r.interval), intersectWithLoop(l.next, r.next, f));
                }
            }
          }
      }
    });
  };
}
/**
 * Returns a new schedule that deals with a narrower class of inputs than this schedule.
 */


export function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Returns a new schedule that deals with a narrower class of inputs than this schedule.
 */

export function contramap_(self, f) {
  return new Schedule((now, i) => T.map_(self.step(now, f(i)), Decision.contramap(f)));
}
/**
 * Returns a new schedule with the specified computed delay added before the start
 * of each interval produced by this schedule.
 */

export function delayed(f) {
  return self => delayed_(self, f);
}
/**
 * Returns a new schedule with the specified computed delay added before the start
 * of each interval produced by this schedule.
 */

export function delayedFrom(schedule) {
  return addDelay_(schedule, x => x);
}
/**
 * Returns a new schedule with the specified computed delay added before the start
 * of each interval produced by this schedule.
 */

export function delayed_(self, f) {
  return delayedM_(self, d => T.succeed(f(d)));
}
/**
 * Returns a new schedule with the specified effectfully computed delay added before the start
 * of each interval produced by this schedule.
 */

export function delayedM(f) {
  return self => delayedM_(self, f);
}
/**
 * Returns a new schedule with the specified effectfully computed delay added before the start
 * of each interval produced by this schedule.
 */

export function delayedM_(self, f) {
  return modifyDelayM_(self, (o, d) => f(d));
}
/**
 * Returns a new schedule that contramaps the input and maps the output.
 */

export function dimap(f) {
  return g => self => dimap_(self, f, g);
}
/**
 * Returns a new schedule that contramaps the input and maps the output.
 */

export function dimap_(self, f, g) {
  return map_(contramap_(self, f), g);
}
/**
 * A schedule that can recur one time, the specified amount of time into the future.
 */

export function duration(n) {
  return new Schedule((now, _) => T.succeed(Decision.makeContinue(0, now + n, () => T.succeed(Decision.makeDone(n)))));
}
/**
 * A schedule that can recur one time, the specified amount of time into the future.
 */

export function durations(n, ...rest) {
  return A.reduce_(rest, duration(n), (acc, d) => andThen_(acc, duration(d)));
}
/**
 * Returns a new schedule that performs a geometric union on the intervals defined
 * by both schedules.
 */

export function union(that) {
  return self => union_(self, that);
}
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 */

export function union_(self, that) {
  return unionWith_(self, that, (d1, d2) => Math.min(d1, d2));
}
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 */

export function unionWith(that, f) {
  return self => unionWith_(self, that, f);
}

function unionWithLoop(self, that, f) {
  return (now, inp) => {
    const left = self(now, inp);
    const right = that(now, inp);
    return T.zipWith_(left, right, (l, r) => {
      switch (l._tag) {
        case "Done":
          {
            switch (r._tag) {
              case "Done":
                {
                  return Decision.makeDone(Tp.tuple(l.out, r.out));
                }

              case "Continue":
                {
                  return Decision.makeContinue(Tp.tuple(l.out, r.out), r.interval, unionWithLoop(() => T.succeed(l), r.next, f));
                }
            }
          }

        case "Continue":
          {
            switch (r._tag) {
              case "Done":
                {
                  return Decision.makeContinue(Tp.tuple(l.out, r.out), l.interval, unionWithLoop(l.next, () => T.succeed(r), f));
                }

              case "Continue":
                {
                  return Decision.makeContinue(Tp.tuple(l.out, r.out), f(l.interval, r.interval), unionWithLoop(l.next, r.next, f));
                }
            }
          }
      }
    });
  };
}
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as either schedule wants to continue and
 * merging the next intervals according to the specified merge function.
 */


export function unionWith_(self, that, f) {
  return new Schedule(unionWithLoop(self.step, that.step, f));
}

function elapsedLoop(o) {
  return (now, _) => T.succeed(O.fold_(o, () => Decision.makeContinue(0, now, elapsedLoop(O.some(now))), start => Decision.makeContinue(now - start, now, elapsedLoop(O.some(start)))));
}
/**
 * A schedule that occurs everywhere, which returns the total elapsed duration since the
 * first step.
 */


export const elapsed = /*#__PURE__*/new Schedule( /*#__PURE__*/elapsedLoop(O.none));
/**
 * A schedule that always recurs, but will wait a certain amount between
 * repetitions, given by `base * factor.pow(n)`, where `n` is the number of
 * repetitions so far. Returns the current duration between recurrences.
 */

export function exponential(base, factor = 2.0) {
  return delayedFrom(map_(forever, i => base * Math.pow(factor, i)));
}
/**
 * A schedule that always recurs, increasing delays by summing the
 * preceding two delays (similar to the fibonacci sequence). Returns the
 * current duration between recurrences.
 */

export function fibonacci(one) {
  return delayedFrom(map_(unfold_(tuple(one, one), ([a1, a2]) => tuple(a1, a1 + a2)), ([_]) => _));
}
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

export function fixed(interval) {
  function loop(startMillis, n) {
    return (now, _) => T.succeed(O.fold_(startMillis, () => Decision.makeContinue(n + 1, now + interval, loop(O.some({
      startMillis: now,
      lastRun: now + interval
    }), n + 1)), ({
      lastRun,
      startMillis
    }) => {
      const runningBehind = now > lastRun + interval;
      const boundary = interval === 0 ? interval : interval - (now - startMillis) % interval;
      const sleepTime = boundary === 0 ? interval : boundary;
      const nextRun = runningBehind ? now : now + sleepTime;
      return Decision.makeContinue(n + 1, nextRun, loop(O.some({
        startMillis,
        lastRun: nextRun
      }), n + 1));
    }));
  }

  return new Schedule(loop(O.none, 0));
}
/**
 * A schedule that always recurs, mapping input values through the
 * specified function.
 */

export function fromFunction(f) {
  return map_(identity(), f);
}
/**
 * A schedule that always recurs, which counts the number of recurrances.
 */

export const count = /*#__PURE__*/unfold_(0, n => n + 1);

function ensuringLoop(finalizer, self) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.as_(finalizer, Decision.makeDone(d.out));
        }

      case "Continue":
        {
          return T.succeed(Decision.makeContinue(d.out, d.interval, ensuringLoop(finalizer, d.next)));
        }
    }
  });
}
/**
 * Returns a new schedule that will run the specified finalizer as soon as the schedule is
 * complete. Note that unlike `Effect#ensuring`, this method does not guarantee the finalizer
 * will be run. The `Schedule` may not initialize or the driver of the schedule may not run
 * to completion. However, if the `Schedule` ever decides not to continue, then the
 * finalizer will be run.
 */


export function ensuring(finalizer) {
  return self => new Schedule(ensuringLoop(finalizer, self.step));
}
/**
 * Returns a new schedule that will run the specified finalizer as soon as the schedule is
 * complete. Note that unlike `Effect#ensuring`, this method does not guarantee the finalizer
 * will be run. The `Schedule` may not initialize or the driver of the schedule may not run
 * to completion. However, if the `Schedule` ever decides not to continue, then the
 * finalizer will be run.
 */

export function ensuring_(self, finalizer) {
  return new Schedule(ensuringLoop(finalizer, self.step));
}
/**
 * Returns a new schedule that packs the input and output of this schedule into the first
 * element of a tuple. This allows carrying information through this schedule.
 */

export function first() {
  return self => bothInOut_(self, identity());
}

function foldMLoop(z, f, self) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.succeed(Decision.makeDone(z));
        }

      case "Continue":
        {
          return T.map_(f(z, d.out), z2 => Decision.makeContinue(z2, d.interval, foldMLoop(z2, f, d.next)));
        }
    }
  });
}
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */


export function fold(z) {
  return f => self => fold_(self, z, f);
}
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */

export function fold_(self, z, f) {
  return foldM_(self, z, (z, o) => T.succeed(f(z, o)));
}
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */

export function foldM(z) {
  return f => self => foldM_(self, z, f);
}
/**
 * Returns a new schedule that effectfully folds over the outputs of this one.
 */

export function foldM_(self, z, f) {
  return new Schedule(foldMLoop(z, f, self.step));
}
/**
 * A schedule that recurs forever, producing a count of repeats: 0, 1, 2, ...
 */

export const forever = /*#__PURE__*/unfold_(0, n => n + 1);

function identityLoop() {
  return (now, i) => T.succeed(Decision.makeContinue(i, now, identityLoop()));
}
/**
 * A schedule that always recurs, which returns inputs as outputs.
 */


export function identity() {
  return new Schedule(identityLoop());
}
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as both schedules want to continue and
 * merging the next intervals according to the specified merge function.
 */

export function intersectWith_(self, that, f) {
  return new Schedule(intersectWithLoop(self.step, that.step, f));
}
/**
 * Returns a new schedule that combines this schedule with the specified
 * schedule, continuing as long as both schedules want to continue and
 * merging the next intervals according to the specified merge function.
 */

export function intersectWith(that, f) {
  return self => intersectWith_(self, that, f);
}
/**
 * Returns a new schedule that randomly modifies the size of the intervals of this schedule.
 */

export function jittered({
  max = 0.1,
  min = 0
} = {}) {
  return self => jittered_(self, {
    min,
    max
  });
}
/**
 * Returns a new schedule that randomly modifies the size of the intervals of this schedule.
 */

export function jittered_(self, {
  max = 0.1,
  min = 0
} = {}) {
  return delayedM_(self, d => T.map_(Random.next, random => d * min * (1 - random) + d * max * random));
}
/**
 * A schedule that always recurs, but will repeat on a linear time
 * interval, given by `base * n` where `n` is the number of
 * repetitions so far. Returns the current duration between recurrences.
 */

export function linear(base) {
  return delayedFrom(map_(forever, i => base * (i + 1)));
}
/**
 * A schedule that recurs one time.
 */

export const once = /*#__PURE__*/unit( /*#__PURE__*/recurs(1));

function mapMLoop(f, self) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.map_(f(d.out), o => Decision.makeDone(o));
        }

      case "Continue":
        {
          return T.map_(f(d.out), o => Decision.makeContinue(o, d.interval, mapMLoop(f, d.next)));
        }
    }
  });
}
/**
 * Returns a new schedule that makes this schedule available on the `Left` side of an `Either`
 * input, allowing propagating some type `X` through this channel on demand.
 */


export function left() {
  return self => choose_(self, identity());
}
/**
 * Returns a new schedule that maps the output of this schedule through the specified
 * effectful function.
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Returns a new schedule that maps the output of this schedule through the specified
 * effectful function.
 */

export function map_(self, f) {
  return mapM_(self, o => T.succeed(f(o)));
}
/**
 * Returns a new schedule that maps the output of this schedule through the specified function.
 */

export function mapM(f) {
  return self => new Schedule(mapMLoop(f, self.step));
}
/**
 * Returns a new schedule that maps the output of this schedule through the specified function.
 */

export function mapM_(self, f) {
  return new Schedule(mapMLoop(f, self.step));
}

function modifyDelayMLoop(f, self) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.succeed(Decision.makeDone(d.out));
        }

      case "Continue":
        {
          const delay = d.interval - now;
          return T.map_(f(d.out, delay), n => Decision.makeContinue(d.out, d.interval + n, modifyDelayMLoop(f, d.next)));
        }
    }
  });
}
/**
 * Returns a new schedule that modifies the delay using the specified
 * effectual function.
 */


export function modifyDelayM(f) {
  return self => modifyDelayM_(self, f);
}
/**
 * Returns a new schedule that modifies the delay using the specified
 * effectual function.
 */

export function modifyDelayM_(self, f) {
  return new Schedule(modifyDelayMLoop(f, self.step));
}
/**
 * Returns a new schedule that modifies the delay using the specified
 * function.
 */

export function modifyDelay(f) {
  return self => modifyDelay_(self, f);
}
/**
 * Returns a new schedule that modifies the delay using the specified
 * function.
 */

export function modifyDelay_(self, f) {
  return modifyDelayM_(self, (o, d) => T.succeed(f(o, d)));
}

function onDecisionLoop(self, f) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.as_(f(d), Decision.makeDone(d.out));
        }

      case "Continue":
        {
          return T.as_(f(d), Decision.makeContinue(d.out, d.interval, onDecisionLoop(d.next, f)));
        }
    }
  });
}
/**
 * Returns a new schedule that applies the current one but runs the specified effect
 * for every decision of this schedule. This can be used to create schedules
 * that log failures, decisions, or computed values.
 */


export function onDecision_(self, f) {
  return new Schedule(onDecisionLoop(self.step, f));
}
/**
 * Returns a new schedule that applies the current one but runs the specified effect
 * for every decision of this schedule. This can be used to create schedules
 * that log failures, decisions, or computed values.
 */

export function onDecision(f) {
  return self => new Schedule(onDecisionLoop(self.step, f));
}

function provideAllLoop(env, self) {
  return (now, i) => T.provideAll_(T.map_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return Decision.makeDone(d.out);
        }

      case "Continue":
        {
          return Decision.makeContinue(d.out, d.interval, provideAllLoop(env, d.next));
        }
    }
  }), env);
}
/**
 * Returns a new schedule with its environment provided to it, so the resulting
 * schedule does not require any environment.
 */


export function provideAll(env) {
  return self => provideAll_(self, env);
}
/**
 * Returns a new schedule with its environment provided to it, so the resulting
 * schedule does not require any environment.
 */

export function provideAll_(self, env) {
  return new Schedule(provideAllLoop(env, self.step));
}

function provideSomeLoop(env, self) {
  return (now, i) => T.provideSome_(T.map_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return Decision.makeDone(d.out);
        }

      case "Continue":
        {
          return Decision.makeContinue(d.out, d.interval, provideSomeLoop(env, d.next));
        }
    }
  }), env);
}
/**
 * Returns a new schedule with part of its environment provided to it, so the
 * resulting schedule does not require any environment.
 */


export function provideSome(env) {
  return self => new Schedule(provideSomeLoop(env, self.step));
}
/**
 * Returns a new schedule with part of its environment provided to it, so the
 * resulting schedule does not require any environment.
 */

export function provideSome_(self, env) {
  return new Schedule(provideSomeLoop(env, self.step));
}
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */

export function reconsider(f) {
  return self => reconsider_(self, f);
}
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */

export function reconsider_(self, f) {
  return reconsiderM_(self, d => T.succeed(f(d)));
}

function reconsiderMLoop(self, f) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.map_(f(d), E.fold(o2 => Decision.makeDone(o2), ([o2]) => Decision.makeDone(o2)));
        }

      case "Continue":
        {
          return T.map_(f(d), E.fold(o2 => Decision.makeDone(o2), ([o2, int]) => Decision.makeContinue(o2, int, reconsiderMLoop(d.next, f))));
        }
    }
  });
}
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */


export function reconsiderM(f) {
  return self => reconsiderM_(self, f);
}
/**
 * Returns a new schedule that effectfully reconsiders every decision made by this schedule,
 * possibly modifying the next interval and the output type in the process.
 */

export function reconsiderM_(self, f) {
  return new Schedule(reconsiderMLoop(self.step, f));
}
/**
 * Returns a new schedule that outputs the number of repetitions of this one.
 */

export function repetitions(self) {
  return fold_(self, 0, n => n + 1);
}
/**
 * Return a new schedule that automatically resets the schedule to its initial state
 * after some time of inactivity defined by `duration`.
 */

export function resetAfter(duration) {
  return self => map_(resetWhen_(zip_(self, elapsed), ({
    tuple: [_, d]
  }) => d >= duration), ({
    tuple: [o]
  }) => o);
}

function resetWhenLoop(self, step, f) {
  return (now, i) => T.chain_(step(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return f(d.out) ? self.step(now, i) : T.succeed(Decision.makeDone(d.out));
        }

      case "Continue":
        {
          return f(d.out) ? self.step(now, i) : T.succeed(Decision.makeContinue(d.out, d.interval, resetWhenLoop(self, d.next, f)));
        }
    }
  });
}
/**
 * Resets the schedule when the specified predicate on the schedule output evaluates to true.
 */


export function resetWhen(f) {
  return self => resetWhen_(self, f);
}
/**
 * Resets the schedule when the specified predicate on the schedule output evaluates to true.
 */

export function resetWhen_(self, f) {
  return new Schedule(resetWhenLoop(self, self.step, f));
}
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */

export function recurWhile(f) {
  return whileInput_(identity(), f);
}
/**
 * A schedule that recurs for as long as the effectful predicate evaluates to true.
 */

export function recurWhileM(f) {
  return whileInputM_(identity(), f);
}
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */

export function recurWhileEquals(a) {
  return whileInput_(identity(), x => a === x);
}
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */

export function recurUntil(f) {
  return untilInput_(identity(), f);
}
/**
 * A schedule that recurs for as long as the effectful predicate evaluates to true.
 */

export function recurUntilM(f) {
  return untilInputM_(identity(), f);
}
/**
 * A schedule that recurs for as long as the predicate evaluates to true.
 */

export function recurUntilEquals(a) {
  return untilInput_(identity(), x => x === a);
}
/**
 * A schedule spanning all time, which can be stepped only the specified number of times before
 * it terminates.
 */

export function recurs(n) {
  return whileOutput_(forever, x => x < n);
}
/**
 * Returns a new schedule that makes this schedule available on the `Right` side of an `Either`
 * input, allowing propagating some type `X` through this channel on demand.
 */

export function right() {
  return self => choose_(identity(), self);
}

function runLoop(now, xs, self, acc) {
  if (A.isNonEmpty(xs)) {
    return T.chain_(self(now, NA.head(xs)), d => {
      switch (d._tag) {
        case "Done":
          {
            return T.succeed([...acc, d.out]);
          }

        case "Continue":
          {
            return runLoop(d.interval, xs, d.next, [...acc, d.out]);
          }
      }
    });
  } else {
    return T.succeed(acc);
  }
}
/**
 * Runs a schedule using the provided inputs, and collects all outputs.
 */


export function run(now, i) {
  return self => run_(self, now, i);
}
/**
 * Runs a schedule using the provided inputs, and collects all outputs.
 */

export function run_(self, now, i) {
  return runLoop(now, Array.from(i), self.step, []);
}
/**
 * Returns a new schedule that packs the input and output of this schedule into the second
 * element of a tuple. This allows carrying information through this schedule.
 */

export function second() {
  return self => bothInOut_(identity(), self);
}

function tapInputLoop(self, f) {
  return (now, i) => T.chain_(f(i), () => T.map_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return Decision.makeDone(d.out);
        }

      case "Continue":
        {
          return Decision.makeContinue(d.out, d.interval, tapInputLoop(d.next, f));
        }
    }
  }));
}
/**
 * Returns a schedule that recurs continuously, each repetition spaced the specified duration
 * from the last run.
 */


export function spaced(duration) {
  return addDelay_(forever, () => duration);
}
/**
 * A schedule that does not recur, it just stops.
 */

export const stop = /*#__PURE__*/unit( /*#__PURE__*/recurs(0));
/**
 * Returns a schedule that repeats one time, producing the specified constant value.
 */

export function succeed(a) {
  return as(a)(forever);
}
/**
 * Returns a new schedule that effectfully processes every input to this schedule.
 */

export function tapInput_(self, f) {
  return new Schedule(tapInputLoop(self.step, f));
}
/**
 * Returns a new schedule that effectfully processes every input to this schedule.
 */

export function tapInput(f) {
  return self => new Schedule(tapInputLoop(self.step, f));
}

function tapOutputLoop(self, f) {
  return (now, i) => T.chain_(self(now, i), d => {
    switch (d._tag) {
      case "Done":
        {
          return T.as_(f(d.out), Decision.makeDone(d.out));
        }

      case "Continue":
        {
          return T.as_(f(d.out), Decision.makeContinue(d.out, d.interval, tapOutputLoop(d.next, f)));
        }
    }
  });
}
/**
 * Returns a new schedule that effectfully processes every output from this schedule.
 */


export function tapOutput(f) {
  return self => tapOutput_(self, f);
}
/**
 * Returns a new schedule that effectfully processes every output from this schedule.
 */

export function tapOutput_(self, f) {
  return new Schedule(tapOutputLoop(self.step, f));
}
/**
 * Returns a new schedule that maps the output of this schedule to unit.
 */

export function unit(self) {
  return as(undefined)(self);
}
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */

export function untilInput(f) {
  return self => untilInput_(self, f);
}
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */

export function untilInput_(self, f) {
  return check_(self, i => !f(i));
}
/**
 * Returns a new schedule that continues until the specified effectful predicate on the input
 * evaluates to true.
 */

export function untilInputM(f) {
  return self => untilInputM_(self, f);
}
/**
 * Returns a new schedule that continues until the specified effectful predicate on the input
 * evaluates to true.
 */

export function untilInputM_(self, f) {
  return checkM_(self, i => T.map_(f(i), b => !b));
}
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */

export function untilOutput(f) {
  return self => untilOutput_(self, f);
}
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */

export function untilOutput_(self, f) {
  return check_(self, (_, o) => !f(o));
}
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */

export function untilOutputM(f) {
  return self => untilOutputM_(self, f);
}
/**
 * Returns a new schedule that continues until the specified predicate on the input evaluates
 * to true.
 */

export function untilOutputM_(self, f) {
  return checkM_(self, (_, o) => T.map_(f(o), b => !b));
}
/**
 * Returns a new schedule that continues for as long the specified predicate on the input
 * evaluates to true.
 */

export function whileInput(f) {
  return self => whileInput_(self, f);
}
/**
 * Returns a new schedule that continues for as long the specified predicate on the input
 * evaluates to true.
 */

export function whileInput_(self, f) {
  return check_(self, i => f(i));
}
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * input evaluates to true.
 */

export function whileInputM(f) {
  return self => whileInputM_(self, f);
}
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * input evaluates to true.
 */

export function whileInputM_(self, f) {
  return checkM_(self, i => f(i));
}
/**
 * Returns a new schedule that continues for as long the specified predicate on the output
 * evaluates to true.
 */

export function whileOutput(f) {
  return self => whileOutput_(self, f);
}
/**
 * Returns a new schedule that continues for as long the specified predicate on the output
 * evaluates to true.
 */

export function whileOutput_(self, f) {
  return check_(self, (_, o) => f(o));
}
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * output evaluates to true.
 */

export function whileOutputM(f) {
  return self => whileOutputM_(self, f);
}
/**
 * Returns a new schedule that continues for as long the specified effectful predicate on the
 * output evaluates to true.
 */

export function whileOutputM_(self, f) {
  return checkM_(self, (_, o) => T.map_(f(o), b => !b));
}

function windowedLoop(interval, startMillis, n) {
  return (now, _) => T.succeed(O.fold_(startMillis, () => Decision.makeContinue(n + 1, now + interval, windowedLoop(interval, O.some(now), n + 1)), startMillis => {
    return Decision.makeContinue(n + 1, now + (interval - (now - startMillis) % interval), windowedLoop(interval, O.some(startMillis), n + 1));
  }));
}
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


export function windowed(interval) {
  return new Schedule(windowedLoop(interval, O.none, 0));
}

function unfoldLoop(a, f) {
  return (now, _) => T.succeed(Decision.makeContinue(a, now, unfoldLoop(f(a), f)));
}
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */


export function unfold(f) {
  return a => unfold_(a, f);
}
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */

export function unfold_(a, f) {
  return new Schedule(now => T.succeedWith(() => Decision.makeContinue(a, now, unfoldLoop(f(a), f))));
}
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */

export function unfoldM(f) {
  return a => unfoldM_(a, f);
}

function unfoldMLoop(a, f) {
  return (now, _) => T.succeed(Decision.makeContinue(a, now, (n, i) => T.chain_(f(a), x => unfoldMLoop(x, f)(n, i))));
}
/**
 * Unfolds a schedule that repeats one time from the specified state and iterator.
 */


export function unfoldM_(a, f) {
  return new Schedule(unfoldMLoop(a, f));
}
/**
 * Returns a new schedule that performs a geometric intersection on the intervals defined
 * by both schedules.
 */

export function zip_(self, that) {
  return intersectWith_(self, that, (d, d2) => Math.max(d, d2));
}
/**
 * Returns a new schedule that performs a geometric intersection on the intervals defined
 * by both schedules.
 */

export function zip(that) {
  return self => intersectWith_(self, that, (d, d2) => Math.max(d, d2));
}
/**
 * Same as zip but ignores the right output.
 */

export function zipLeft(that) {
  return self => zipLeft_(self, that);
}
/**
 * Same as zip but ignores the right output.
 */

export function zipLeft_(self, that) {
  return map_(zip_(self, that), _ => _.get(0));
}
/**
 * Same as zip but ignores the right output.
 */

export function zipRight(that) {
  return self => zipRight_(self, that);
}
/**
 * Same as zip but ignores the right output.
 */

export function zipRight_(self, that) {
  return map_(zip_(self, that), _ => _.get(1));
}
/**
 * Equivalent to `zip` followed by `map`.
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
/**
 * Equivalent to `zip` followed by `map`.
 */

export function zipWith_(self, that, f) {
  return map_(zip_(self, that), ({
    tuple: [o, o1]
  }) => f(o, o1));
}
//# sourceMappingURL=schedule.mjs.map