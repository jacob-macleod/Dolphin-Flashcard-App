// ets_tracing: off
import { pipe, tuple } from "../../Function/index.mjs";
export function apF(F) {
  return fa => fab => F.map(({
    tuple: [a, f]
  }) => f(a))(F.both(fab)(fa));
}

function curried(f, n, acc) {
  return function (x) {
    const combined = acc.concat([x]); // eslint-disable-next-line prefer-spread

    return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
  };
}

function getRecordConstructor(keys) {
  const len = keys.length;
  return curried((...args) => {
    const r = {};

    for (let i = 0; i < len; i++) {
      r[keys[i]] = args[i];
    }

    return r;
  }, len - 1, []);
}

export function structF(F) {
  const ap = apF(F);
  return r => {
    const keys = Object.keys(r);
    const len = keys.length;
    const f = getRecordConstructor(keys);
    let fr = F.map(f)(r[keys[0]]);

    for (let i = 1; i < len; i++) {
      fr = ap(r[keys[i]])(fr);
    }

    return fr;
  };
}
const tupleConstructors = {};

function getTupleConstructor(len) {
  // eslint-disable-next-line no-prototype-builtins
  if (!tupleConstructors.hasOwnProperty(len)) {
    tupleConstructors[len] = curried(tuple, len - 1, []);
  }

  return tupleConstructors[len];
}

export function tupleF(F) {
  const ap = apF(F);
  return (...args) => {
    const len = args.length;
    const f = getTupleConstructor(len);
    let fas = F.map(f)(args[0]);

    for (let i = 1; i < len; i++) {
      fas = ap(args[i])(fas);
    }

    return fas;
  };
}
//# sourceMappingURL=apply.mjs.map