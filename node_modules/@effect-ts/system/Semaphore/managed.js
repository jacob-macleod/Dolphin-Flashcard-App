"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = /*#__PURE__*/require("../Managed/core.js");

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
//# sourceMappingURL=managed.js.map