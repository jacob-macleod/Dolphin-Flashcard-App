"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  intersect: true,
  pattern: true,
  matchTag: true,
  pattern_: true,
  matchTag_: true,
  patternFor: true,
  matchTagFor: true,
  isEither: true,
  isOption: true,
  isTag: true,
  isSync: true,
  isAdtElement: true,
  isGenericAdtElement: true,
  onAdtElement: true,
  onGenericAdtElement: true
};
exports.intersect = intersect;
exports.isAdtElement = isAdtElement;
exports.isEither = isEither;
exports.isGenericAdtElement = isGenericAdtElement;
exports.isOption = isOption;
exports.isSync = isSync;
exports.isTag = isTag;
exports.matchTag_ = exports.matchTagFor = exports.matchTag = void 0;
exports.onAdtElement = onAdtElement;
exports.onGenericAdtElement = onGenericAdtElement;
exports.pattern_ = exports.patternFor = exports.pattern = void 0;

require("../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Option/index.js");

var _tool = /*#__PURE__*/require("./tool.js");

Object.keys(_tool).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tool[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tool[key];
    }
  });
});

var _lazy = /*#__PURE__*/require("./lazy.js");

Object.keys(_lazy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _lazy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lazy[key];
    }
  });
});

var _union = /*#__PURE__*/require("./union.js");

Object.keys(_union).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _union[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _union[key];
    }
  });
});

var _equal = /*#__PURE__*/require("./equal.js");

Object.keys(_equal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _equal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _equal[key];
    }
  });
});

var _unification = /*#__PURE__*/require("./unification.js");

Object.keys(_unification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _unification[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unification[key];
    }
  });
});

// ets_tracing: off
function intersect(...as) {
  return as.reduce((a, b) => ({ ...a,
    ...b
  }));
}

const pattern = n => (_, d) => m => {
  return _[m[n]] ? _[m[n]](m, m) : d(m, m);
};

exports.pattern = pattern;
const matchTag = /*#__PURE__*/pattern("_tag");
exports.matchTag = matchTag;

const pattern_ = n => (m, _, d) => {
  return _[m[n]] ? _[m[n]](m, m) : d(m, m);
};

exports.pattern_ = pattern_;
const matchTag_ = /*#__PURE__*/pattern_("_tag");
exports.matchTag_ = matchTag_;

const patternFor = n => () => (_, d) => m => {
  return _[m[n]] ? _[m[n]](m, m) : d(m, m);
};

exports.patternFor = patternFor;
const matchTagFor = /*#__PURE__*/patternFor("_tag");
exports.matchTagFor = matchTagFor;

function isEither(u) {
  return typeof u === "object" && u != null && "_tag" in u && (u["_tag"] === "Left" || u["_tag"] === "Right");
}

function isOption(u) {
  return typeof u === "object" && u != null && "_tag" in u && (u["_tag"] === "Some" || u["_tag"] === "None");
}

function isTag(u) {
  return typeof u === "object" && u != null && "_tag" in u && u["_tag"] === "Tag";
}

function isSync(u) {
  return typeof u === "object" && u != null && "_tag" in u && u["_tag"] === "XPure";
}

function isAdtElement(tag) {
  return adt => adt["_tag"] === tag;
}

function isGenericAdtElement(_t) {
  return tag => adt => adt[_t] === tag;
}

function onAdtElement(tag, f) {
  return adt => {
    if (adt["_tag"] === tag) {
      return (0, _index2.some)(f(adt));
    }

    return _index2.none;
  };
}

function onGenericAdtElement(_t) {
  return (tag, f) => adt => {
    if (adt[_t] === tag) {
      return (0, _index2.some)(f(adt));
    }

    return _index2.none;
  };
}
//# sourceMappingURL=index.js.map