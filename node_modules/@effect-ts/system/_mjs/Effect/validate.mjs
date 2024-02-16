// ets_tracing: off
import * as Chunk from "../Collections/Immutable/Chunk/core.mjs";
import * as E from "../Either/index.mjs";
import { absolve } from "./absolve.mjs";
import { either } from "./either.mjs";
import { forEach_, forEachExec_, forEachPar_, forEachParN_ } from "./excl-forEach.mjs";
import { map_ } from "./map.mjs";
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */

export function validate_(as, f, __trace) {
  return absolve(map_(forEach_(as, a => either(f(a))), mergeExits()), __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */

export function validatePar_(as, f, __trace) {
  return absolve(map_(forEachPar_(as, a => either(f(a))), mergeExits()), __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */

export function validateParN_(as, n, f, __trace) {
  return absolve(map_(forEachParN_(as, n, a => either(f(a))), mergeExits()), __trace);
}

function mergeExits() {
  return exits => {
    let errors = Chunk.empty();
    let results = Chunk.empty();

    for (const e of exits) {
      if (e._tag === "Left") {
        errors = Chunk.append_(errors, e.left);
      } else {
        results = Chunk.append_(results, e.right);
      }
    }

    if (!Chunk.isEmpty(errors)) {
      return E.left(errors);
    } else {
      return E.right(results);
    }
  };
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */


export function validateExec_(as, es, f, __trace) {
  return absolve(map_(forEachExec_(as, es, a => either(f(a))), mergeExits()), __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validate_
 */

export function validate(f, __trace) {
  return as => validate_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validatePar_
 */

export function validatePar(f, __trace) {
  return as => validatePar_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validateParN_
 */

export function validateParN(n, f, __trace) {
  return as => validateParN_(as, n, f, __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validateExec_
 */

export function validateExec(es, f, __trace) {
  return as => validateExec_(as, es, f, __trace);
}
//# sourceMappingURL=validate.mjs.map