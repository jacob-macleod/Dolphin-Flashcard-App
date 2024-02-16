"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatepickerViewsYears = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../../helpers/merge-deep");
const DatepickerContext_1 = require("../DatepickerContext");
const helpers_1 = require("../helpers");
const DatepickerViewsYears = ({ theme: customTheme = {} }) => {
    const { theme: rootTheme, selectedDate, minDate, maxDate, viewDate, setViewDate, setView } = (0, DatepickerContext_1.useDatePickerContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.views.years, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: theme.items.base, children: [...Array(12)].map((_year, index) => {
            const first = (0, helpers_1.startOfYearPeriod)(viewDate, 10);
            const year = first - 1 + index * 1;
            const newDate = new Date(viewDate.getTime());
            newDate.setFullYear(year);
            const isSelected = (0, helpers_1.isDateEqual)(selectedDate, newDate);
            const isDisabled = !(0, helpers_1.isDateInRange)(newDate, minDate, maxDate);
            return ((0, jsx_runtime_1.jsx)("button", { disabled: isDisabled, type: "button", className: (0, tailwind_merge_1.twMerge)(theme.items.item.base, isSelected && theme.items.item.selected, isDisabled && theme.items.item.disabled), onClick: () => {
                    if (isDisabled)
                        return;
                    setViewDate(newDate);
                    setView(helpers_1.Views.Months);
                }, children: year }, index));
        }) }));
};
exports.DatepickerViewsYears = DatepickerViewsYears;
