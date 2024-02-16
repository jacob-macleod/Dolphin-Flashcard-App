"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sync = /*#__PURE__*/require("@effect-ts/system/Sync");

Object.keys(_Sync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Sync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Sync[key];
    }
  });
});
//# sourceMappingURL=core.js.map