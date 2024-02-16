"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepEquals = void 0;
exports.equals = equals;
exports.equalsSym = void 0;
exports.hasEquals = hasEquals;

var _index = /*#__PURE__*/require("../HasHash/index.js");

var _comparator = /*#__PURE__*/require("./comparator.js");

var _utils = /*#__PURE__*/require("./utils.js");

const equalsSym = /*#__PURE__*/Symbol();
exports.equalsSym = equalsSym;

function hasEquals(u) {
  return (0, _index.hasHash)(u) && equalsSym in u;
}

const deepEquals = /*#__PURE__*/(0, _comparator.createComparator)( /*#__PURE__*/(0, _utils.createCircularEqualCreator)(eq => (a, b, meta) => {
  if (hasEquals(a)) {
    return a[equalsSym](b);
  } else {
    return eq(a, b, meta);
  }
}));
exports.deepEquals = deepEquals;

function equals(a, b) {
  if (!(0, _utils.sameValueZeroEqual)((0, _index.hash)(a), (0, _index.hash)(b))) {
    return false;
  } else if (hasEquals(a)) {
    return a[equalsSym](b);
  } else if (hasEquals(b)) {
    return b[equalsSym](a);
  }

  return (0, _utils.sameValueZeroEqual)(a, b);
}
//# sourceMappingURL=index.js.map