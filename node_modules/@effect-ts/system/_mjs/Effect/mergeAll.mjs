// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import * as I from "../Iterable/index.mjs";
import * as Ref from "../Ref/index.mjs";
import * as core from "./core.mjs";
import * as forEach from "./excl-forEach.mjs";
import { zipWith_ } from "./zipWith.mjs";
import { zipWithPar_ } from "./zipWithPar.mjs";
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 *
 * @ets_data_first mergeAll_
 */

export function mergeAll(zero, f, __trace) {
  return as => mergeAll_(as, zero, f, __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working sequentially.
 */

export function mergeAll_(as, zero, f, __trace) {
  return core.suspend(() => I.reduce_(as, core.succeed(zero), (b, a) => zipWith_(b, a, f)), __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllPar_
 */

export function mergeAllPar(zero, f, __trace) {
  return as => mergeAllPar_(as, zero, f, __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */

export function mergeAllPar_(as, zero, f, __trace) {
  return core.suspend(() => I.reduce_(as, core.succeed(zero), (b, a) => zipWithPar_(b, a, f)), __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @ets_data_first mergeAllParN_
 */

export function mergeAllParN(n, zero, f, __trace) {
  return as => mergeAllParN_(as, n, zero, f, __trace);
}
/**
 * Merges an `Iterable[IO]` to a single IO, working in with up to `n` fibers in parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 */

export function mergeAllParN_(as, n, zero, f, __trace) {
  return core.chain_(Ref.makeRef(zero), acc => core.chain_(forEach.forEachUnitParN_(as, n, core.chain(a => Ref.update_(acc, b => f(b, a))), __trace), () => acc.get));
}
//# sourceMappingURL=mergeAll.mjs.map