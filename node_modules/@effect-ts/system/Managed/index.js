"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../Operator/index.js");

var _core = /*#__PURE__*/require("./core.js");

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _core[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _do = /*#__PURE__*/require("./do.js");

Object.keys(_do).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _do[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _do[key];
    }
  });
});

var _forEach = /*#__PURE__*/require("./forEach.js");

Object.keys(_forEach).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _forEach[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _forEach[key];
    }
  });
});

var _fork = /*#__PURE__*/require("./fork.js");

Object.keys(_fork).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fork[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fork[key];
    }
  });
});

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

Object.keys(_fromEffect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fromEffect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fromEffect[key];
    }
  });
});

var _makeExit = /*#__PURE__*/require("./makeExit.js");

Object.keys(_makeExit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _makeExit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _makeExit[key];
    }
  });
});

var _managed = /*#__PURE__*/require("./managed.js");

Object.keys(_managed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _managed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _managed[key];
    }
  });
});

var _struct = /*#__PURE__*/require("./struct.js");

Object.keys(_struct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _struct[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _struct[key];
    }
  });
});

var _succeed = /*#__PURE__*/require("./succeed.js");

Object.keys(_succeed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _succeed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _succeed[key];
    }
  });
});

var _tuple = /*#__PURE__*/require("./tuple.js");

Object.keys(_tuple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tuple[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tuple[key];
    }
  });
});

var _use = /*#__PURE__*/require("./use.js");

Object.keys(_use).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _use[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _use[key];
    }
  });
});

var _absolve = /*#__PURE__*/require("./methods/absolve.js");

Object.keys(_absolve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _absolve[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _absolve[key];
    }
  });
});

var _allocate = /*#__PURE__*/require("./methods/allocate.js");

Object.keys(_allocate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _allocate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _allocate[key];
    }
  });
});

var _api = /*#__PURE__*/require("./methods/api.js");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _ensuringFirst = /*#__PURE__*/require("./methods/ensuringFirst.js");

Object.keys(_ensuringFirst).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ensuringFirst[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ensuringFirst[key];
    }
  });
});

var _environment = /*#__PURE__*/require("./methods/environment.js");

Object.keys(_environment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _environment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _environment[key];
    }
  });
});

var _foldM = /*#__PURE__*/require("./methods/foldM.js");

Object.keys(_foldM).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _foldM[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foldM[key];
    }
  });
});

var _fromEither = /*#__PURE__*/require("./methods/fromEither.js");

Object.keys(_fromEither).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fromEither[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fromEither[key];
    }
  });
});

var _gen = /*#__PURE__*/require("./methods/gen.js");

Object.keys(_gen).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gen[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gen[key];
    }
  });
});

var _halt = /*#__PURE__*/require("./methods/halt.js");

Object.keys(_halt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _halt[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _halt[key];
    }
  });
});

var _ifM = /*#__PURE__*/require("./methods/ifM.js");

Object.keys(_ifM).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ifM[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ifM[key];
    }
  });
});

var _iterate = /*#__PURE__*/require("./methods/iterate.js");

Object.keys(_iterate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _iterate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterate[key];
    }
  });
});

var _loop = /*#__PURE__*/require("./methods/loop.js");

Object.keys(_loop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _loop[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _loop[key];
    }
  });
});

var _makeSucceedWith = /*#__PURE__*/require("./methods/makeSucceedWith.js");

Object.keys(_makeSucceedWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _makeSucceedWith[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _makeSucceedWith[key];
    }
  });
});

var _mapN = /*#__PURE__*/require("./methods/mapN.js");

Object.keys(_mapN).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mapN[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapN[key];
    }
  });
});

var _preallocationScope = /*#__PURE__*/require("./methods/preallocationScope.js");

Object.keys(_preallocationScope).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _preallocationScope[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _preallocationScope[key];
    }
  });
});

var _releaseMap = /*#__PURE__*/require("./methods/releaseMap.js");

Object.keys(_releaseMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _releaseMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _releaseMap[key];
    }
  });
});

var _runtime = /*#__PURE__*/require("./methods/runtime.js");

Object.keys(_runtime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _runtime[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _runtime[key];
    }
  });
});

var _suspend = /*#__PURE__*/require("./methods/suspend.js");

Object.keys(_suspend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _suspend[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _suspend[key];
    }
  });
});

var _swap = /*#__PURE__*/require("./methods/swap.js");

Object.keys(_swap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _swap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swap[key];
    }
  });
});

var _switchable = /*#__PURE__*/require("./methods/switchable.js");

Object.keys(_switchable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _switchable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _switchable[key];
    }
  });
});

var _union = /*#__PURE__*/require("./methods/union.js");

Object.keys(_union).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _union[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _union[key];
    }
  });
});

var _updateService = /*#__PURE__*/require("./methods/updateService.js");

Object.keys(_updateService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _updateService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updateService[key];
    }
  });
});
//# sourceMappingURL=index.js.map