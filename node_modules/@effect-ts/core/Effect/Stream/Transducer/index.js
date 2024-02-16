"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../../Operator/index.js");

var _Transducer = /*#__PURE__*/require("@effect-ts/system/Stream/Transducer");

Object.keys(_Transducer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Transducer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Transducer[key];
    }
  });
});
//# sourceMappingURL=index.js.map