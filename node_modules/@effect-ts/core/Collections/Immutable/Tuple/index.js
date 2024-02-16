"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tuple = /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple");

Object.keys(_Tuple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Tuple[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Tuple[key];
    }
  });
});
//# sourceMappingURL=index.js.map