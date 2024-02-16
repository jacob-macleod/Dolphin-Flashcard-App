"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _ImmutableQueue = /*#__PURE__*/require("@effect-ts/system/Support/ImmutableQueue");

Object.keys(_ImmutableQueue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ImmutableQueue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ImmutableQueue[key];
    }
  });
});
//# sourceMappingURL=index.js.map