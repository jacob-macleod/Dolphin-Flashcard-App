"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Journal = /*#__PURE__*/require("@effect-ts/system/Transactional/STM/Journal");

Object.keys(_Journal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Journal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Journal[key];
    }
  });
});
//# sourceMappingURL=index.js.map