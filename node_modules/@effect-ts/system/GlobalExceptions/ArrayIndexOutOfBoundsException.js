"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayIndexOutOfBoundsExceptionTypeId = exports.ArrayIndexOutOfBoundsException = void 0;
// ets_tracing: off
const ArrayIndexOutOfBoundsExceptionTypeId = /*#__PURE__*/Symbol();
exports.ArrayIndexOutOfBoundsExceptionTypeId = ArrayIndexOutOfBoundsExceptionTypeId;

class ArrayIndexOutOfBoundsException {
  constructor(index) {
    this.index = index;
    this._typeId = ArrayIndexOutOfBoundsExceptionTypeId;
  }

}

exports.ArrayIndexOutOfBoundsException = ArrayIndexOutOfBoundsException;
//# sourceMappingURL=ArrayIndexOutOfBoundsException.js.map