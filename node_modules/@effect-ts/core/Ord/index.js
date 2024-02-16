"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  OrdURI: true
};
Object.defineProperty(exports, "OrdURI", {
  enumerable: true,
  get: function () {
    return _index2.OrdURI;
  }
});

require("../Operator/index.js");

var _Ord = /*#__PURE__*/require("@effect-ts/system/Ord");

Object.keys(_Ord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Ord[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Ord[key];
    }
  });
});

var _index2 = /*#__PURE__*/require("../Modules/index.js");

var _operations = /*#__PURE__*/require("./operations.js");

Object.keys(_operations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _operations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _operations[key];
    }
  });
});
//# sourceMappingURL=index.js.map