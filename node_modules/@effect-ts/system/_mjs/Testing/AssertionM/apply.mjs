import { AssertionM } from "./AssertionM.mjs";
export function apply(render, runM) {
  return new class extends AssertionM {}(render, runM);
}
//# sourceMappingURL=apply.mjs.map