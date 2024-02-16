"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../../Operator/index.js");

var _Push = /*#__PURE__*/require("@effect-ts/system/Stream/Push");

Object.keys(_Push).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Push[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Push[key];
    }
  });
});
//# sourceMappingURL=index.js.map