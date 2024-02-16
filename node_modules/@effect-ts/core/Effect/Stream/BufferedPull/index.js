"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../../Operator/index.js");

var _BufferedPull = /*#__PURE__*/require("@effect-ts/system/Stream/BufferedPull");

Object.keys(_BufferedPull).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BufferedPull[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BufferedPull[key];
    }
  });
});
//# sourceMappingURL=index.js.map