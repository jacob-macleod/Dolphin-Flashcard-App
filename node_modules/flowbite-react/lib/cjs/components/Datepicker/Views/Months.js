"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatepickerViewsMonth = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../../helpers/merge-deep");
const DatepickerContext_1 = require("../DatepickerContext");
const helpers_1 = require("../helpers");
const DatepickerViewsMonth = ({ theme: customTheme = {} }) => {
    const { theme: rootTheme, minDate, maxDate, selectedDate, viewDate, language, setViewDate, setView, } = (0, DatepickerContext_1.useDatePickerContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.views.months, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: theme.items.base, children: [...Array(12)].map((_month, index) => {
            const newDate = new Date(viewDate.getTime());
            newDate.setMonth(index);
            const month = (0, helpers_1.getFormattedDate)(language, newDate, { month: 'short' });
            const isSelected = (0, helpers_1.isDateEqual)(selectedDate, newDate);
            const isDisabled = !(0, helpers_1.isDateInRange)(newDate, minDate, maxDate);
            return ((0, jsx_runtime_1.jsx)("button", { disabled: isDisabled, type: "button", className: (0, tailwind_merge_1.twMerge)(theme.items.item.base, isSelected && theme.items.item.selected, isDisabled && theme.items.item.disabled), onClick: () => {
                    if (isDisabled)
                        return;
                    setViewDate(newDate);
                    setView(helpers_1.Views.Days);
                }, children: month }, index));
        }) }));
};
exports.DatepickerViewsMonth = DatepickerViewsMonth;
