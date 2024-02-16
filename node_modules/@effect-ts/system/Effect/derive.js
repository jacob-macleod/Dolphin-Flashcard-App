"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deriveAccess = deriveAccess;
exports.deriveAccessM = deriveAccessM;
exports.deriveLifted = deriveLifted;

var has = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./has.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function deriveLifted(H) {
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

function deriveAccessM(H) {
  return generics => {
    const ret = {};

    for (const k of generics) {
      ret[k] = (f, trace) => has.accessServiceM(H)(h => f(h[k]), trace);
    }

    return ret;
  };
}

function deriveAccess(H) {
  return generics => {
    const ret = {};

    for (const k of generics) {
      ret[k] = (f, trace) => has.accessService(H)(h => f(h[k]), trace);
    }

    return ret;
  };
}
//# sourceMappingURL=derive.js.map