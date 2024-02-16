"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Schedule = /*#__PURE__*/require("@effect-ts/system/Schedule");

Object.keys(_Schedule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Schedule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Schedule[key];
    }
  });
});
//# sourceMappingURL=index.js.map