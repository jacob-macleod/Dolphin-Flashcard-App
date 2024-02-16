import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../../helpers/merge-deep';
import { useDatePickerContext } from '../DatepickerContext';
import { Views, getFormattedDate, isDateEqual, isDateInRange } from '../helpers';
export const DatepickerViewsMonth = ({ theme: customTheme = {} }) => {
    const { theme: rootTheme, minDate, maxDate, selectedDate, viewDate, language, setViewDate, setView, } = useDatePickerContext();
    const theme = mergeDeep(rootTheme.views.months, customTheme);
    return (_jsx("div", { className: theme.items.base, children: [...Array(12)].map((_month, index) => {
            const newDate = new Date(viewDate.getTime());
            newDate.setMonth(index);
            const month = getFormattedDate(language, newDate, { month: 'short' });
            const isSelected = isDateEqual(selectedDate, newDate);
            const isDisabled = !isDateInRange(newDate, minDate, maxDate);
            return (_jsx("button", { disabled: isDisabled, type: "button", className: twMerge(theme.items.item.base, isSelected && theme.items.item.selected, isDisabled && theme.items.item.disabled), onClick: () => {
                    if (isDisabled)
                        return;
                    setViewDate(newDate);
                    setView(Views.Days);
                }, children: month }, index));
        }) }));
};
