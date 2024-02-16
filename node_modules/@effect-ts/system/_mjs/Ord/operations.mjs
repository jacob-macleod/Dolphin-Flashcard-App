import { makeEqual } from "../Equal/index.mjs";
/**
 * Creates Ord[A] from a compare function
 */

export function makeOrd(compare) {
  return {
    compare
  };
}
/**
 * Contramap Ord input
 */

export function contramap(f) {
  return fa => contramap_(fa, f);
}
/**
 * Contramap Ord input
 */

export function contramap_(fa, f) {
  return makeOrd((x, y) => fa.compare(f(x), f(y)));
}
/**
 * Test whether one value is _strictly greater than_ another
 */

export function gt(O) {
  return (x, y) => O.compare(x, y) === 1;
}
/**
 * Test whether one value is _non-strictly less than_ another
 */

export function leq(O) {
  return (x, y) => O.compare(x, y) !== 1;
}
/**
 * Test whether one value is _strictly less than_ another
 */

export function lt(O) {
  return (x, y) => O.compare(x, y) === -1;
}
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 */

export function max(O) {
  return (x, y) => O.compare(x, y) === -1 ? y : x;
}
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 */

export function min(O) {
  return (x, y) => O.compare(x, y) === 1 ? y : x;
}
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 */

export function between(O) {
  const lessThanO = lt(O);
  const greaterThanO = gt(O);
  return (low, hi) => x => lessThanO(x, low) || greaterThanO(x, hi) ? false : true;
}
/**
 * Clamp a value between a minimum and a maximum
 */

export function clamp(O) {
  const minO = min(O);
  const maxO = max(O);
  return (low, hi) => x => maxO(minO(x, hi), low);
}
/**
 * Get the dual of an Ord
 */

export function inverted(O) {
  return makeOrd((x, y) => O.compare(y, x));
}
/**
 * Get an instance of Equal
 */

export function getEqual(O) {
  return makeEqual((x, y) => O.compare(x, y) === 0);
}
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 */

export function tuple(...ords) {
  return makeOrd((x, y) => {
    let i = 0;

    for (; i < ords.length - 1; i++) {
      const r = ords[i].compare(x.get(i), y.get(i));

      if (r !== 0) {
        return r;
      }
    }

    return ords[i].compare(x.get(i), y.get(i));
  });
}
//# sourceMappingURL=operations.mjs.map