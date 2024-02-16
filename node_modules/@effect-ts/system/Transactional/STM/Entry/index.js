"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntryTypeId = exports.EntryOpsTypeId = exports.EntryOps = exports.Entry = void 0;
exports.makeEntry = makeEntry;

require("../../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Versioned/index.js");

// ets_tracing: off
const EntryTypeId = /*#__PURE__*/Symbol();
exports.EntryTypeId = EntryTypeId;

class Entry {
  constructor(use) {
    this.use = use;
    this._typeId = EntryTypeId;
  }

}

exports.Entry = Entry;

function makeEntry(tref0, isNew0) {
  const versioned = tref0.versioned;
  const ops = new EntryOps(tref0, versioned, versioned.value, isNew0, false);
  return new Entry(f => f(ops));
}

const EntryOpsTypeId = /*#__PURE__*/Symbol();
exports.EntryOpsTypeId = EntryOpsTypeId;

class EntryOps {
  constructor(tref, expected, newValue, isNew, isChanged) {
    this._typeId = EntryOpsTypeId;
    this.tref = tref;
    this.expected = expected;
    this.newValue = newValue;
    this.isNew = isNew;
    this._isChanged = isChanged;
  }

  unsafeSet(value) {
    this._isChanged = true;
    this.newValue = value;
  }

  unsafeGet() {
    return this.newValue;
  }

  commit() {
    this.tref.versioned = new _index2.Versioned(this.newValue);
  }

  copy() {
    const ops = new EntryOps(this.tref, this.expected, this.newValue, this.isNew, this.isChanged());
    return new Entry(f => f(ops));
  }

  isInvalid() {
    return !this.isValid();
  }

  isValid() {
    return this.tref.versioned === this.expected;
  }

  isChanged() {
    return this._isChanged;
  }

  toString() {
    return `Entry(expected.value = ${this.expected.value}, newValue = ${this.newValue}, tref = ${this.tref}, isChanged = ${this.isChanged()})`;
  }

}

exports.EntryOps = EntryOps;
//# sourceMappingURL=index.js.map