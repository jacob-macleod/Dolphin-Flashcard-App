"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Versioned = /*#__PURE__*/require("@effect-ts/system/Transactional/STM/Versioned");

Object.keys(_Versioned).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Versioned[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Versioned[key];
    }
  });
});
//# sourceMappingURL=index.js.map