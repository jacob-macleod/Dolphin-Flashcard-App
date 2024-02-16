"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _AtomicBoolean = /*#__PURE__*/require("@effect-ts/system/Support/AtomicBoolean");

Object.keys(_AtomicBoolean).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AtomicBoolean[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AtomicBoolean[key];
    }
  });
});
//# sourceMappingURL=index.js.map