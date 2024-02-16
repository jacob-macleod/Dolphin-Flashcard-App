"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  forEach: true,
  forEachPar: true,
  forEachPar_: true,
  forEachUnit_: true,
  forEach_: true
};
Object.defineProperty(exports, "forEach", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEach;
  }
});
Object.defineProperty(exports, "forEachPar", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEachPar;
  }
});
Object.defineProperty(exports, "forEachPar_", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEachPar_;
  }
});
Object.defineProperty(exports, "forEachUnit_", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEachUnit_;
  }
});
Object.defineProperty(exports, "forEach_", {
  enumerable: true,
  get: function () {
    return _exclForEach.forEach_;
  }
});

var _effect = /*#__PURE__*/require("./effect.js");

Object.keys(_effect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _effect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _effect[key];
    }
  });
});

var _exclForEach = /*#__PURE__*/require("../../Effect/excl-forEach.js");
//# sourceMappingURL=effect-api.js.map