export function conditionalF(_) {
  return (onTrue, onFalse) => b => b ? onTrue() : onFalse();
}
export function conditionalF_(_) {
  return (predicate, onTrue, onFalse) => predicate ? onTrue() : onFalse();
}
//# sourceMappingURL=conditionals.mjs.map