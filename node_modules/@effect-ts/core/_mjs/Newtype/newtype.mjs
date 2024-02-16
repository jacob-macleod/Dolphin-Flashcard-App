// ets_tracing: off
export function typeDef() {
  return URI => {
    return {
      URI,
      wrap: _ => _,
      unwrap: _ => _
    };
  };
}
export function genericDef(URI) {
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
export const newtype = () => _ => _;
//# sourceMappingURL=newtype.mjs.map