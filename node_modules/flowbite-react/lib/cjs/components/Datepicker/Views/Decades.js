"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatepickerViewsDecades = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../../helpers/merge-deep");
const DatepickerContext_1 = require("../DatepickerContext");
const helpers_1 = require("../helpers");
const DatepickerViewsDecades = ({ theme: customTheme = {} }) => {
    const { theme: rootTheme, selectedDate, viewDate, setViewDate, setView } = (0, DatepickerContext_1.useDatePickerContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.views.decades, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: theme.items.base, children: [...Array(12)].map((_year, index) => {
            const first = (0, helpers_1.startOfYearPeriod)(viewDate, 100);
            const year = first - 10 + index * 10;
            const firstDate = new Date(year, 0, 1);
            const lastDate = (0, helpers_1.addYears)(firstDate, 9);
            const isSelected = (0, helpers_1.isDateInDecade)(viewDate, year);
            const isDisabled = !(0, helpers_1.isDateInRange)(viewDate, firstDate, lastDate);
            return ((0, jsx_runtime_1.jsx)("button", { disabled: isDisabled, type: "button", className: (0, tailwind_merge_1.twMerge)(theme.items.item.base, isSelected && theme.items.item.selected, isDisabled && theme.items.item.disabled), onClick: () => {
                    if (isDisabled)
                        return;
                    setViewDate((0, helpers_1.addYears)(viewDate, year - selectedDate.getFullYear()));
                    setView(helpers_1.Views.Years);
                }, children: year }, index));
        }) }));
};
exports.DatepickerViewsDecades = DatepickerViewsDecades;
