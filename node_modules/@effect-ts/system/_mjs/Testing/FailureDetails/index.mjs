import * as l from "../AssertionValue/label";
export const failureDetailsTypeId = /*#__PURE__*/Symbol();
/**
 * `FailureDetails` keeps track of details relevant to failures.
 */

export class FailureDetails {
  constructor(assertion) {
    this.assertion = assertion;
    this.typeId = failureDetailsTypeId;
  }

}
export function label_(self, str) {
  const [h, ...tail] = self.assertion;
  return new FailureDetails([l.label_(h, str), ...tail]);
}
export function label(str) {
  return self => label_(self, str);
}
//# sourceMappingURL=index.mjs.map