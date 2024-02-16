"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _AtomicReference = /*#__PURE__*/require("@effect-ts/system/Support/AtomicReference");

Object.keys(_AtomicReference).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AtomicReference[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AtomicReference[key];
    }
  });
});
//# sourceMappingURL=index.js.map