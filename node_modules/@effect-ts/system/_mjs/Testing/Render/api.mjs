import * as AssertionM from "../AssertionM/AssertionM.mjs";
import * as R from "./definition.mjs";
/**
 * Creates a string representation of a class name.
 */

export function className(cons) {
  return cons.prototype.constructor.name;
}
/**
 * Creates a string representation of a field accessor.
 */

export function field(name) {
  return `_.${name}`;
}
/**
 * Create a `Render` from an assertion combinator that should be rendered
 * using standard function notation.
 */

export function function_(name, paramLists) {
  return new R.Function_(name, paramLists);
}
/**
 * Create a `Render` from an assertion combinator that should be rendered
 * using infix function notation.
 */

export function infix(left, op, right) {
  return new R.Infix(left, op, right);
}
/**
 * Construct a `RenderParam` from an `AssertionM`.
 */

export function param(value) {
  if (AssertionM.isAssertionM(value)) {
    return new R.AssertionM(value);
  }

  return new R.Value(value);
}
/**
 * Quote a string so it renders as a valid Scala string when rendered.
 */

export function quoted(str) {
  return `"${str}"`;
}
//# sourceMappingURL=api.mjs.map