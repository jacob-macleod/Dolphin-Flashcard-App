"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../Operator/index.js");

var _api = /*#__PURE__*/require("./api.js");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _XRefM = /*#__PURE__*/require("./XRefM.js");

Object.keys(_XRefM).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _XRefM[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _XRefM[key];
    }
  });
});
//# sourceMappingURL=index.js.map