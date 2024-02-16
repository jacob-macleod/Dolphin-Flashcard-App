/* eslint-disable prefer-rest-params */
// ets_tracing: off
import "../Operator/index.mjs";
import * as T from "@effect-ts/system/Effect";
/**
 * Like forEach but preserves the type of the collection used
 */

export function forEachOf(C) {
  // @ts-expect-error
  return function () {
    if (arguments.length >= 2 && typeof arguments[1] !== "string") {
      return T.suspend(() => {
        let builder = C.builder();
        return T.map_(T.forEachUnit_(arguments[0], a => T.map_(arguments[1](a), aa => {
          builder = builder.append(aa);
        }), arguments[2]), () => builder.build());
      });
    }

    return self => forEachOf(C)(self, arguments[0], arguments[1]);
  };
}
/**
 * Like forEachPar but preserves the type of the collection used
 */

export function forEachParOf(C) {
  // @ts-expect-error
  return function () {
    if (arguments.length >= 2 && typeof arguments[1] !== "string") {
      return T.map_(T.forEachPar_(arguments[0], arguments[1], arguments[2]), arr => {
        let builder = C.builder();

        for (const b of arr) {
          builder = builder.append(b);
        }

        return builder.build();
      });
    }

    return self => forEachParOf(C)(self, arguments[0], arguments[1]);
  };
}
/**
 * Like forEachParN but preserves the type of the collection used
 */

export function forEachParNOf(C) {
  // @ts-expect-error
  return function () {
    if (arguments.length >= 3 && typeof arguments[2] !== "string") {
      return T.map_(T.forEachParN_(arguments[0], arguments[1], arguments[2], arguments[3]), arr => {
        let builder = C.builder();

        for (const b of arr) {
          builder = builder.append(b);
        }

        return builder.build();
      });
    }

    return self => forEachParNOf(C)(self, arguments[0], arguments[1], arguments[2]);
  };
}
//# sourceMappingURL=operations.mjs.map