// ets_tracing: off
import { reduce, reduce_ } from "../Collections/Immutable/Chunk/api/reduce.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as Exit from "../Exit/index.mjs";
import * as Fiber from "../Fiber/index.mjs";
import { pipe } from "../Function/index.mjs";
import { await as promiseAwait } from "../Promise/await.mjs";
import { halt } from "../Promise/halt.mjs";
import { make } from "../Promise/make.mjs";
import { succeed } from "../Promise/succeed.mjs";
import * as Ref from "../Ref/index.mjs";
import * as as from "./as.mjs";
import * as asUnit from "./asUnit.mjs";
import * as core from "./core.mjs";
import * as Do from "./do.mjs";
import { forEach_ } from "./excl-forEach.mjs";
import { flatten } from "./flatten.mjs";
import * as interruption from "./interruption.mjs";
import * as map from "./map.mjs";
import * as tap from "./tap.mjs";

function arbiter(fibers, winner, promise, fails) {
  return res => Exit.foldM(e => flatten(Ref.modify_(fails, c => Tp.tuple(c === 0 ? asUnit.asUnit(halt(e)(promise)) : core.unit, c - 1))), a => core.chain_(succeed(Tp.tuple(a, winner))(promise), set => set ? reduce(core.unit, (io, f) => f === winner ? io : tap.tap_(io, () => Fiber.interrupt(f)))(fibers) : core.unit))(res);
}
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */


export function raceAllWithStrategy(ios, interruptStrategy, __trace) {
  return map.map_(tap.tap_(Do.bind_(Do.bind_(Do.bind_(Do.do, "done", () => make()), "fails", () => Ref.makeRef(ios.length)), "c", ({
    done,
    fails
  }) => interruption.uninterruptibleMask(({
    restore
  }) => map.map_(Do.bind_(Do.let_(tap.tap_(Do.bind_(Do.do, "fs", () => forEach_(ios, x => core.fork(interruption.interruptible(x)))), ({
    fs
  }) => reduce_(fs, core.unit, (io, f) => core.chain_(io, () => core.fork(core.chain_(f.await, arbiter(fs, f, done, fails)))))), "inheritRefs", () => res => as.as_(res.get(1).inheritRefs, res.get(0))), "c", ({
    fs,
    inheritRefs
  }) => interruption.onInterrupt_(restore(core.chain_(promiseAwait(done), inheritRefs)), () => reduce_(fs, core.unit, (io, f) => tap.tap_(io, () => Fiber.interrupt(f))))), ({
    c,
    fs
  }) => ({
    c,
    fs
  })), __trace)), ({
    c: {
      fs
    }
  }) => interruptStrategy === "wait" ? forEach_(fs, f => f.await) : core.unit), ({
    c: {
      c
    }
  }) => c);
}
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */

export function raceAll(ios, __trace) {
  return raceAllWithStrategy(ios, "background", __trace);
}
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */

export function raceAllWait(ios, __trace) {
  return raceAllWithStrategy(ios, "wait", __trace);
}
//# sourceMappingURL=raceAll.mjs.map