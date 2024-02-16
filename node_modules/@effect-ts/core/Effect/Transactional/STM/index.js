"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _STM = /*#__PURE__*/require("@effect-ts/system/Transactional/STM");

Object.keys(_STM).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _STM[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _STM[key];
    }
  });
});
//# sourceMappingURL=index.js.map