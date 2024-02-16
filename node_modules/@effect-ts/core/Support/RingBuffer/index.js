"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _RingBuffer = /*#__PURE__*/require("@effect-ts/system/Support/RingBuffer");

Object.keys(_RingBuffer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RingBuffer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RingBuffer[key];
    }
  });
});
//# sourceMappingURL=index.js.map