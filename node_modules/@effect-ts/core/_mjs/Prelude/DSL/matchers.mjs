export function matchers(_) {
  function match(tag) {
    return (...args) => {
      return _ => {
        const matcher = args[0][_[tag]];
        return matcher ? matcher(_, _) : args[1](_, _);
      };
    };
  }

  function matchIn(tag) {
    return () => (...args) => {
      return _ => {
        const matcher = args[0][_[tag]];
        return matcher ? matcher(_, _) : args[1](_, _);
      };
    };
  }

  function matchMorph(MorphADT) {
    return (...args) => {
      return _ => {
        const matcher = args[0][_[MorphADT.tag]];
        return matcher ? matcher(_, _) : args[1](_, _);
      };
    };
  }

  const matchTagIn = matchIn("_tag");
  const matchTag = match("_tag");
  return {
    match,
    matchTag,
    matchIn,
    matchTagIn,
    matchMorph
  };
}
//# sourceMappingURL=matchers.mjs.map