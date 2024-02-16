"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Failure", {
  enumerable: true,
  get: function () {
    return Exit.Failure;
  }
});
Object.defineProperty(exports, "Success", {
  enumerable: true,
  get: function () {
    return Exit.Success;
  }
});
Object.defineProperty(exports, "ap", {
  enumerable: true,
  get: function () {
    return Exit.ap;
  }
});
Object.defineProperty(exports, "as", {
  enumerable: true,
  get: function () {
    return Exit.as;
  }
});
Object.defineProperty(exports, "bimap", {
  enumerable: true,
  get: function () {
    return Exit.bimap;
  }
});
Object.defineProperty(exports, "chain", {
  enumerable: true,
  get: function () {
    return Exit.chain;
  }
});
Object.defineProperty(exports, "chain_", {
  enumerable: true,
  get: function () {
    return Exit.chain_;
  }
});
Object.defineProperty(exports, "collectAll", {
  enumerable: true,
  get: function () {
    return Exit.collectAll;
  }
});
Object.defineProperty(exports, "collectAllPar", {
  enumerable: true,
  get: function () {
    return Exit.collectAllPar;
  }
});
Object.defineProperty(exports, "die", {
  enumerable: true,
  get: function () {
    return Exit.die;
  }
});
Object.defineProperty(exports, "exists", {
  enumerable: true,
  get: function () {
    return Exit.exists;
  }
});
Object.defineProperty(exports, "fail", {
  enumerable: true,
  get: function () {
    return Exit.fail;
  }
});
Object.defineProperty(exports, "flatten", {
  enumerable: true,
  get: function () {
    return Exit.flatten;
  }
});
Object.defineProperty(exports, "fold", {
  enumerable: true,
  get: function () {
    return Exit.fold;
  }
});
exports.foldM = foldM;
exports.foldM_ = foldM_;
Object.defineProperty(exports, "fold_", {
  enumerable: true,
  get: function () {
    return Exit.fold_;
  }
});
exports.forEach = forEach;
exports.forEach_ = forEach_;
Object.defineProperty(exports, "fromEither", {
  enumerable: true,
  get: function () {
    return Exit.fromEither;
  }
});
Object.defineProperty(exports, "fromOption", {
  enumerable: true,
  get: function () {
    return Exit.fromOption;
  }
});
Object.defineProperty(exports, "getOrElse", {
  enumerable: true,
  get: function () {
    return Exit.getOrElse;
  }
});
Object.defineProperty(exports, "halt", {
  enumerable: true,
  get: function () {
    return Exit.halt;
  }
});
Object.defineProperty(exports, "interrupt", {
  enumerable: true,
  get: function () {
    return Exit.interrupt;
  }
});
Object.defineProperty(exports, "interrupted", {
  enumerable: true,
  get: function () {
    return Exit.interrupted;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return Exit.map;
  }
});
Object.defineProperty(exports, "mapError", {
  enumerable: true,
  get: function () {
    return Exit.mapError;
  }
});
Object.defineProperty(exports, "mapErrorCause", {
  enumerable: true,
  get: function () {
    return Exit.mapErrorCause;
  }
});
Object.defineProperty(exports, "map_", {
  enumerable: true,
  get: function () {
    return Exit.map_;
  }
});
Object.defineProperty(exports, "orElseFail", {
  enumerable: true,
  get: function () {
    return Exit.orElseFail;
  }
});
Object.defineProperty(exports, "succeed", {
  enumerable: true,
  get: function () {
    return Exit.succeed;
  }
});
Object.defineProperty(exports, "succeeded", {
  enumerable: true,
  get: function () {
    return Exit.succeeded;
  }
});
Object.defineProperty(exports, "toEither", {
  enumerable: true,
  get: function () {
    return Exit.toEither;
  }
});
Object.defineProperty(exports, "unit", {
  enumerable: true,
  get: function () {
    return Exit.unit;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return Exit.zip;
  }
});
Object.defineProperty(exports, "zipLeft", {
  enumerable: true,
  get: function () {
    return Exit.zipLeft;
  }
});
Object.defineProperty(exports, "zipPar", {
  enumerable: true,
  get: function () {
    return Exit.zipPar;
  }
});
Object.defineProperty(exports, "zipParLeft", {
  enumerable: true,
  get: function () {
    return Exit.zipParLeft;
  }
});
Object.defineProperty(exports, "zipParRight", {
  enumerable: true,
  get: function () {
    return Exit.zipParRight;
  }
});
Object.defineProperty(exports, "zipRight", {
  enumerable: true,
  get: function () {
    return Exit.zipRight;
  }
});
Object.defineProperty(exports, "zipRight_", {
  enumerable: true,
  get: function () {
    return Exit.zipRight_;
  }
});
Object.defineProperty(exports, "zipWith", {
  enumerable: true,
  get: function () {
    return Exit.zipWith;
  }
});
Object.defineProperty(exports, "zipWith_", {
  enumerable: true,
  get: function () {
    return Exit.zipWith_;
  }
});

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/effect.js"));

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Folds over the value or cause.
 */
function foldM(failed, succeed) {
  return exit => foldM_(exit, failed, succeed);
}
/**
 * Folds over the value or cause.
 */


function foldM_(exit, failed, succeed) {
  switch (exit._tag) {
    case "Success":
      {
        return succeed(exit.value);
      }

    case "Failure":
      {
        return failed(exit.cause);
      }
  }
}
/**
 * Applies the function `f` to the successful result of the `Exit` and
 * returns the result in a new `Exit`.
 */


function forEach(f) {
  return exit => forEach_(exit, f);
}
/**
 * Applies the function `f` to the successful result of the `Exit` and
 * returns the result in a new `Exit`.
 */


function forEach_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return T.succeed(Exit.halt(exit.cause));
      }

    case "Success":
      {
        return T.result(f(exit.value));
      }
  }
}
//# sourceMappingURL=api.js.map