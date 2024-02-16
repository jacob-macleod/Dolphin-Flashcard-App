function is(typeName, _) {
    if (_) {
        if (Array.isArray(typeName)) {
            // TODO make type field name dynamic (probably will require to code-gen the guard function)
            return typeName.some((typeName_) => _?.type === typeName_);
        }
        else {
            return typeName === _?.type;
        }
    }
    else {
        return (_) => is(typeName, _);
    }
}
export const isType = is;
export const guards = {
    is,
    // isType,
    // hasAllFields,
    // allFields,
    hasField,
    // withField,
};
function hasField(_, property) {
    return _.hasOwnProperty(property);
}
//# sourceMappingURL=guards.js.map