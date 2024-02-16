"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _OneShot = /*#__PURE__*/require("@effect-ts/system/Support/OneShot");

Object.keys(_OneShot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _OneShot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _OneShot[key];
    }
  });
});
//# sourceMappingURL=index.js.map