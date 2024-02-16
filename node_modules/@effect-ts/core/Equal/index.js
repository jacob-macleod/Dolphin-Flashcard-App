"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  EqualURI: true
};
Object.defineProperty(exports, "EqualURI", {
  enumerable: true,
  get: function () {
    return _index2.EqualURI;
  }
});

require("../Operator/index.js");

var _Equal = /*#__PURE__*/require("@effect-ts/system/Equal");

Object.keys(_Equal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Equal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Equal[key];
    }
  });
});

var _index2 = /*#__PURE__*/require("../Modules/index.js");

var _instances = /*#__PURE__*/require("./instances.js");

Object.keys(_instances).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _instances[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _instances[key];
    }
  });
});
//# sourceMappingURL=index.js.map