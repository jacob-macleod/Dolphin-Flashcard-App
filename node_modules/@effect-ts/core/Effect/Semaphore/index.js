"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Semaphore = /*#__PURE__*/require("@effect-ts/system/Semaphore");

Object.keys(_Semaphore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Semaphore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Semaphore[key];
    }
  });
});
//# sourceMappingURL=index.js.map