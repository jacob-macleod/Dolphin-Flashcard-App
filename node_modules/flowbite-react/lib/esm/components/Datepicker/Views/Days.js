import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../../helpers/merge-deep';
import { useDatePickerContext } from '../DatepickerContext';
import { addDays, getFirstDayOfTheMonth, getFormattedDate, getWeekDays, isDateEqual, isDateInRange } from '../helpers';
export const DatepickerViewsDays = ({ theme: customTheme = {} }) => {
    const { theme: rootTheme, weekStart, minDate, maxDate, viewDate, selectedDate, changeSelectedDate, language, } = useDatePickerContext();
    const theme = mergeDeep(rootTheme.views.days, customTheme);
    const weekDays = getWeekDays(language, weekStart);
    const startDate = getFirstDayOfTheMonth(viewDate, weekStart);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: theme.header.base, children: weekDays.map((day, index) => (_jsx("span", { className: theme.header.title, children: day }, index))) }), _jsx("div", { className: theme.items.base, children: [...Array(42)].map((_date, index) => {
                    const currentDate = addDays(startDate, index);
                    const day = getFormattedDate(language, currentDate, { day: 'numeric' });
                    const isSelected = isDateEqual(selectedDate, currentDate);
                    const isDisabled = !isDateInRange(currentDate, minDate, maxDate);
                    return (_jsx("button", { disabled: isDisabled, type: "button", className: twMerge(theme.items.item.base, isSelected && theme.items.item.selected, isDisabled && theme.items.item.disabled), onClick: () => {
                            if (isDisabled)
                                return;
                            changeSelectedDate(currentDate, true);
                        }, children: day }, index));
                }) })] }));
};
