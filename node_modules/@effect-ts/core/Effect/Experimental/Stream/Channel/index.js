"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Channel = /*#__PURE__*/require("@effect-ts/system/Experimental/Stream/Channel");

Object.keys(_Channel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Channel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Channel[key];
    }
  });
});
//# sourceMappingURL=index.js.map