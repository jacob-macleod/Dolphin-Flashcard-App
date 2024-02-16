"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../Operator/index.js");

var _Utils = /*#__PURE__*/require("@effect-ts/system/Utils");

Object.keys(_Utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Utils[key];
    }
  });
});
//# sourceMappingURL=index.js.map