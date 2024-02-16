"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _absolve = /*#__PURE__*/require("../Effect/absolve.js");

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

var _bracket = /*#__PURE__*/require("../Effect/bracket.js");

Object.keys(_bracket).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _bracket[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bracket[key];
    }
  });
});

var _core = /*#__PURE__*/require("../Effect/core.js");

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

var _fail = /*#__PURE__*/require("../Effect/fail.js");

Object.keys(_fail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fail[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fail[key];
    }
  });
});

var _primitives = /*#__PURE__*/require("../Effect/primitives.js");

Object.keys(_primitives).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _primitives[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _primitives[key];
    }
  });
});
//# sourceMappingURL=excl-effect.js.map