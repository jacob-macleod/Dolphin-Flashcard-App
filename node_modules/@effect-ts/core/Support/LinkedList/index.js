"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _LinkedList = /*#__PURE__*/require("@effect-ts/system/Support/LinkedList");

Object.keys(_LinkedList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LinkedList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LinkedList[key];
    }
  });
});
//# sourceMappingURL=index.js.map