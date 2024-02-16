"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _primitives = /*#__PURE__*/require("./primitives.js");

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
//# sourceMappingURL=index.js.map