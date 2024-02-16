"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  exitForeach: true,
  exitHalt: true,
  exitInterrupt: true,
  exitCollectAll: true,
  exitCollectAllPar: true,
  exitSucceed: true,
  exitUnit: true,
  exitZipRight_: true
};
Object.defineProperty(exports, "exitCollectAll", {
  enumerable: true,
  get: function () {
    return _core2.collectAll;
  }
});
Object.defineProperty(exports, "exitCollectAllPar", {
  enumerable: true,
  get: function () {
    return _core2.collectAllPar;
  }
});
Object.defineProperty(exports, "exitForeach", {
  enumerable: true,
  get: function () {
    return _api.forEach;
  }
});
Object.defineProperty(exports, "exitHalt", {
  enumerable: true,
  get: function () {
    return _api.halt;
  }
});
Object.defineProperty(exports, "exitInterrupt", {
  enumerable: true,
  get: function () {
    return _api.interrupt;
  }
});
Object.defineProperty(exports, "exitSucceed", {
  enumerable: true,
  get: function () {
    return _core2.succeed;
  }
});
Object.defineProperty(exports, "exitUnit", {
  enumerable: true,
  get: function () {
    return _core2.unit;
  }
});
Object.defineProperty(exports, "exitZipRight_", {
  enumerable: true,
  get: function () {
    return _core2.zipRight_;
  }
});

var _zips = /*#__PURE__*/require("../Effect/zips.js");

Object.keys(_zips).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _zips[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zips[key];
    }
  });
});

var _bracketExit = /*#__PURE__*/require("../Effect/bracketExit.js");

Object.keys(_bracketExit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bracketExit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bracketExit[key];
    }
  });
});

var _core = /*#__PURE__*/require("../Effect/core.js");

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _core[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _coreScope = /*#__PURE__*/require("../Effect/core-scope.js");

Object.keys(_coreScope).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _coreScope[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _coreScope[key];
    }
  });
});

var _do = /*#__PURE__*/require("../Effect/do.js");

Object.keys(_do).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _do[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _do[key];
    }
  });
});

var _done = /*#__PURE__*/require("../Effect/done.js");

Object.keys(_done).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _done[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _done[key];
    }
  });
});

var _effect = /*#__PURE__*/require("../Effect/effect.js");

Object.keys(_effect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _effect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _effect[key];
    }
  });
});

var _commons = /*#__PURE__*/require("../Effect/commons.js");

Object.keys(_commons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _commons[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _commons[key];
    }
  });
});

var _environment = /*#__PURE__*/require("../Effect/environment.js");

Object.keys(_environment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _environment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _environment[key];
    }
  });
});

var _ExecutionStrategy = /*#__PURE__*/require("../Effect/ExecutionStrategy.js");

Object.keys(_ExecutionStrategy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ExecutionStrategy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ExecutionStrategy[key];
    }
  });
});

var _fail = /*#__PURE__*/require("../Effect/fail.js");

Object.keys(_fail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _fail[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fail[key];
    }
  });
});

var _flatten = /*#__PURE__*/require("../Effect/flatten.js");

Object.keys(_flatten).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _flatten[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flatten[key];
    }
  });
});

var _interruption = /*#__PURE__*/require("../Effect/interruption.js");

Object.keys(_interruption).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interruption[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interruption[key];
    }
  });
});

var _map = /*#__PURE__*/require("../Effect/map.js");

Object.keys(_map).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _map[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _map[key];
    }
  });
});

var _mapError = /*#__PURE__*/require("../Effect/mapError.js");

Object.keys(_mapError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mapError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapError[key];
    }
  });
});

var _mapErrorCause = /*#__PURE__*/require("../Effect/mapErrorCause.js");

Object.keys(_mapErrorCause).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mapErrorCause[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapErrorCause[key];
    }
  });
});

var _never = /*#__PURE__*/require("../Effect/never.js");

Object.keys(_never).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _never[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _never[key];
    }
  });
});

var _provideSome = /*#__PURE__*/require("../Effect/provideSome.js");

Object.keys(_provideSome).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _provideSome[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _provideSome[key];
    }
  });
});

var _sandbox = /*#__PURE__*/require("../Effect/sandbox.js");

Object.keys(_sandbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sandbox[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sandbox[key];
    }
  });
});

var _tap = /*#__PURE__*/require("../Effect/tap.js");

Object.keys(_tap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tap[key];
    }
  });
});

var _zipWith = /*#__PURE__*/require("../Effect/zipWith.js");

Object.keys(_zipWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _zipWith[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zipWith[key];
    }
  });
});

var _zipWithPar = /*#__PURE__*/require("../Effect/zipWithPar.js");

Object.keys(_zipWithPar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _zipWithPar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zipWithPar[key];
    }
  });
});

var _zip = /*#__PURE__*/require("../Effect/zip.js");

Object.keys(_zip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _zip[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zip[key];
    }
  });
});

var _api = /*#__PURE__*/require("../Exit/api.js");

var _core2 = /*#__PURE__*/require("../Exit/core.js");
//# sourceMappingURL=deps-core.js.map