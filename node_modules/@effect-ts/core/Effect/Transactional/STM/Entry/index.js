"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Entry = /*#__PURE__*/require("@effect-ts/system/Transactional/STM/Entry");

Object.keys(_Entry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Entry[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Entry[key];
    }
  });
});
//# sourceMappingURL=index.js.map