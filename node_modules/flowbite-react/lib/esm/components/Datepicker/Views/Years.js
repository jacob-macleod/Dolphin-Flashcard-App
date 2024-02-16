'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../../helpers/merge-deep';
import { useDatePickerContext } from '../DatepickerContext';
import { Views, isDateEqual, isDateInRange, startOfYearPeriod } from '../helpers';
export const DatepickerViewsYears = ({ theme: customTheme = {} }) => {
    const { theme: rootTheme, selectedDate, minDate, maxDate, viewDate, setViewDate, setView } = useDatePickerContext();
    const theme = mergeDeep(rootTheme.views.years, customTheme);
    return (_jsx("div", { className: theme.items.base, children: [...Array(12)].map((_year, index) => {
            const first = startOfYearPeriod(viewDate, 10);
            const year = first - 1 + index * 1;
            const newDate = new Date(viewDate.getTime());
            newDate.setFullYear(year);
            const isSelected = isDateEqual(selectedDate, newDate);
            const isDisabled = !isDateInRange(newDate, minDate, maxDate);
            return (_jsx("button", { disabled: isDisabled, type: "button", className: twMerge(theme.items.item.base, isSelected && theme.items.item.selected, isDisabled && theme.items.item.disabled), onClick: () => {
                    if (isDisabled)
                        return;
                    setViewDate(newDate);
                    setView(Views.Months);
                }, children: year }, index));
        }) }));
};
