"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericDef = genericDef;
exports.newtype = void 0;
exports.typeDef = typeDef;

// ets_tracing: off
function typeDef() {
  return URI => {
    return {
      URI,
      wrap: _ => _,
      unwrap: _ => _
    };
  };
}

function genericDef(URI) {
  return {
    URI,
    wrap: _ => _,
    unwrap: _ => _,
    of: () => ({
      URI,
      wrap: _ => _,
      unwrap: _ => _
    })
  };
}

const newtype = () => _ => _;

exports.newtype = newtype;
//# sourceMappingURL=newtype.js.map