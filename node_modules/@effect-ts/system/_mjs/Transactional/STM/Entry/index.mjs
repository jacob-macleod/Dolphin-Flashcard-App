// ets_tracing: off
import "../../../Operator/index.mjs";
import { Versioned } from "../Versioned/index.mjs";
export const EntryTypeId = /*#__PURE__*/Symbol();
export class Entry {
  constructor(use) {
    this.use = use;
    this._typeId = EntryTypeId;
  }

}
export function makeEntry(tref0, isNew0) {
  const versioned = tref0.versioned;
  const ops = new EntryOps(tref0, versioned, versioned.value, isNew0, false);
  return new Entry(f => f(ops));
}
export const EntryOpsTypeId = /*#__PURE__*/Symbol();
export class EntryOps {
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
    this.tref.versioned = new Versioned(this.newValue);
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
//# sourceMappingURL=index.mjs.map