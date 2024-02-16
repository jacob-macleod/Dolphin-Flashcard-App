"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flow = flow;

// ets_tracing: off
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
  switch (arguments.length) {
    case 1:
      return ab;

    case 2:
      return function () {
        return bc(ab.apply(this, arguments));
      };

    case 3:
      return function () {
        return cd(bc(ab.apply(this, arguments)));
      };

    case 4:
      return function () {
        return de(cd(bc(ab.apply(this, arguments))));
      };

    case 5:
      return function () {
        return ef(de(cd(bc(ab.apply(this, arguments)))));
      };

    case 6:
      return function () {
        return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
      };

    case 7:
      return function () {
        return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
      };

    case 8:
      return function () {
        return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
      };

    case 9:
      return function () {
        return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
      };
  }

  return;
}
//# sourceMappingURL=flow.js.map