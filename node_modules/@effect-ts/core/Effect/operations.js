"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachOf = forEachOf;
exports.forEachParNOf = forEachParNOf;
exports.forEachParOf = forEachParOf;

require("../Operator/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Effect"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable prefer-rest-params */
// ets_tracing: off

/**
 * Like forEach but preserves the type of the collection used
 */
function forEachOf(C) {
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


function forEachParOf(C) {
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


function forEachParNOf(C) {
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
//# sourceMappingURL=operations.js.map