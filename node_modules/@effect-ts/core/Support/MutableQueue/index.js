"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _MutableQueue = /*#__PURE__*/require("@effect-ts/system/Support/MutableQueue");

Object.keys(_MutableQueue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MutableQueue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MutableQueue[key];
    }
  });
});
//# sourceMappingURL=index.js.map