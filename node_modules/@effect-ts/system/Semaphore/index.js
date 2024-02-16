"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../Operator/index.js");

var _semaphore = /*#__PURE__*/require("./semaphore.js");

Object.keys(_semaphore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _semaphore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _semaphore[key];
    }
  });
});
//# sourceMappingURL=index.js.map