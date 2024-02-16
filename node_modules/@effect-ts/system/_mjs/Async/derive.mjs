import * as has from "./has.mjs";
export function deriveLifted(H) {
  return (functions, constants, values) => {
    const ret = {};

    for (const k of functions) {
      // @ts-expect-error
      ret[k] = (...args) => has.accessServiceM(H)(h => h[k](...args));
    }

    for (const k of constants) {
      // @ts-expect-error
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
      ret[k] = f => has.accessServiceM(H)(h => f(h[k]));
    }

    return ret;
  };
}
export function deriveAccess(H) {
  return generics => {
    const ret = {};

    for (const k of generics) {
      ret[k] = f => has.accessService(H)(h => f(h[k]));
    }

    return ret;
  };
}
//# sourceMappingURL=derive.mjs.map