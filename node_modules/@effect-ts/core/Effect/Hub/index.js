"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Hub = /*#__PURE__*/require("@effect-ts/system/Hub");

Object.keys(_Hub).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Hub[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Hub[key];
    }
  });
});
//# sourceMappingURL=index.js.map