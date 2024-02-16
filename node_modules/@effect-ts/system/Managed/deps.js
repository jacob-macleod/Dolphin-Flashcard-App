"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  forEach: true,
  forEachParN_: true,
  forEachPar_: true,
  forEach_: true,
  toManaged: true
};
Object.defineProperty(exports, "forEach", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEach;
  }
});
Object.defineProperty(exports, "forEachParN_", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEachParN_;
  }
});
Object.defineProperty(exports, "forEachPar_", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEachPar_;
  }
});
Object.defineProperty(exports, "forEach_", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEach_;
  }
});
Object.defineProperty(exports, "toManaged", {
  enumerable: true,
  get: function () {
    return _toManaged.toManaged;
  }
});

var _exclForEach = /*#__PURE__*/require("../Effect/excl-forEach.js");

var _toManaged = /*#__PURE__*/require("../Effect/toManaged.js");

var _depsCore = /*#__PURE__*/require("./deps-core.js");

Object.keys(_depsCore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _depsCore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _depsCore[key];
    }
  });
});
//# sourceMappingURL=deps.js.map