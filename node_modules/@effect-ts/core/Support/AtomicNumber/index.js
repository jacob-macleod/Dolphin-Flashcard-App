"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _AtomicNumber = /*#__PURE__*/require("@effect-ts/system/Support/AtomicNumber");

Object.keys(_AtomicNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AtomicNumber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AtomicNumber[key];
    }
  });
});
//# sourceMappingURL=index.js.map