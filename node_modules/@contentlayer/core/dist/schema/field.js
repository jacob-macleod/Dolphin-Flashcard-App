export const isListFieldDef = (_) => _.type === 'list';
export var ListFieldDefItem;
(function (ListFieldDefItem) {
    ListFieldDefItem.isDefItemNested = (_) => _.type === 'nested';
    ListFieldDefItem.isDefItemReference = (_) => _.type === 'reference';
})(ListFieldDefItem || (ListFieldDefItem = {}));
export const isNestedFieldDef = (_) => _.type === 'nested';
export const isNestedPolymorphicFieldDef = (_) => _.type === 'nested_polymorphic';
export const isNestedUnnamedFieldDef = (_) => _.type === 'nested_unnamed';
export const isReferenceField = (_) => _.type === 'reference';
//# sourceMappingURL=field.js.map