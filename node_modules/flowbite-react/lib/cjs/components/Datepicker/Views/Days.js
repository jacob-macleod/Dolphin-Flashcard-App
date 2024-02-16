"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatepickerViewsDays = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../../helpers/merge-deep");
const DatepickerContext_1 = require("../DatepickerContext");
const helpers_1 = require("../helpers");
const DatepickerViewsDays = ({ theme: customTheme = {} }) => {
    const { theme: rootTheme, weekStart, minDate, maxDate, viewDate, selectedDate, changeSelectedDate, language, } = (0, DatepickerContext_1.useDatePickerContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.views.days, customTheme);
    const weekDays = (0, helpers_1.getWeekDays)(language, weekStart);
    const startDate = (0, helpers_1.getFirstDayOfTheMonth)(viewDate, weekStart);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: theme.header.base, children: weekDays.map((day, index) => ((0, jsx_runtime_1.jsx)("span", { className: theme.header.title, children: day }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: theme.items.base, children: [...Array(42)].map((_date, index) => {
                    const currentDate = (0, helpers_1.addDays)(startDate, index);
                    const day = (0, helpers_1.getFormattedDate)(language, currentDate, { day: 'numeric' });
                    const isSelected = (0, helpers_1.isDateEqual)(selectedDate, currentDate);
                    const isDisabled = !(0, helpers_1.isDateInRange)(currentDate, minDate, maxDate);
                    return ((0, jsx_runtime_1.jsx)("button", { disabled: isDisabled, type: "button", className: (0, tailwind_merge_1.twMerge)(theme.items.item.base, isSelected && theme.items.item.selected, isDisabled && theme.items.item.disabled), onClick: () => {
                            if (isDisabled)
                                return;
                            changeSelectedDate(currentDate, true);
                        }, children: day }, index));
                }) })] }));
};
exports.DatepickerViewsDays = DatepickerViewsDays;
