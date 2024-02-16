"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ParSeq = /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/ParSeq");

Object.keys(_ParSeq).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ParSeq[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ParSeq[key];
    }
  });
});
//# sourceMappingURL=index.js.map