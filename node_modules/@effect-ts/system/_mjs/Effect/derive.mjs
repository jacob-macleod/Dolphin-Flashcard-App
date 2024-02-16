import * as has from "./has.mjs";
export function deriveLifted(H) {
  return (functions, constants, values) => {
    const ret = {};

    for (const k of functions) {
      ret[k] = (...args) => has.accessServiceM(H)(h => h[k](...args));
    }

    for (const k of constants) {
      ret[k] = has.accessServiceM(H)(h => h[k]);
    }

    for (const k of values) {
      ret[k] = has.accessService(H)(h => h[k]);
    }

    return ret;
  };
}
export function deriveAccessM(H) {
  return generics => {
    const ret = {};

    for (const k of generics) {
      ret[k] = (f, trace) => has.accessServiceM(H)(h => f(h[k]), trace);
    }

    return ret;
  };
}
export function deriveAccess(H) {
  return generics => {
    const ret = {};

    for (const k of generics) {
      ret[k] = (f, trace) => has.accessService(H)(h => f(h[k]), trace);
    }

    return ret;
  };
}
//# sourceMappingURL=derive.mjs.map