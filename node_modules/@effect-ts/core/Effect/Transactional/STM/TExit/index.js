"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TExit = /*#__PURE__*/require("@effect-ts/system/Transactional/STM/TExit");

Object.keys(_TExit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TExit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TExit[key];
    }
  });
});
//# sourceMappingURL=index.js.map