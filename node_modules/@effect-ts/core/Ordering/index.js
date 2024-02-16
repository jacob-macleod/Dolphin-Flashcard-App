"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../Operator/index.js");

var _Ordering = /*#__PURE__*/require("@effect-ts/system/Ordering");

Object.keys(_Ordering).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Ordering[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Ordering[key];
    }
  });
});

var _operations = /*#__PURE__*/require("./operations.js");

Object.keys(_operations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _operations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _operations[key];
    }
  });
});
//# sourceMappingURL=index.js.map