'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiCalendar } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { TextInput } from '../TextInput';
import { DatepickerContext } from './DatepickerContext';
import { DatepickerViewsDays } from './Views/Days';
import { DatepickerViewsDecades } from './Views/Decades';
import { DatepickerViewsMonth } from './Views/Months';
import { DatepickerViewsYears } from './Views/Years';
import { Views, WeekStart, addMonths, addYears, getFirstDateInRange, getFormattedDate, isDateEqual, startOfYearPeriod, } from './helpers';
export const Datepicker = ({ title, open, inline = false, autoHide = true, // Hide when selected the day
showClearButton = true, labelClearButton = 'Clear', showTodayButton = true, labelTodayButton = 'Today', defaultDate = new Date(), minDate, maxDate, language = 'en', weekStart = WeekStart.Sunday, className, theme: customTheme = {}, onSelectedDateChanged, ...props }) => {
    const theme = mergeDeep(getTheme().datepicker, customTheme);
    // Default date should respect the range
    defaultDate = getFirstDateInRange(defaultDate, minDate, maxDate);
    const [isOpen, setIsOpen] = useState(open);
    const [view, setView] = useState(Views.Days);
    // selectedDate is the date selected by the user
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    // viewDate is only for navigation
    const [viewDate, setViewDate] = useState(defaultDate);
    const inputRef = useRef(null);
    const datepickerRef = useRef(null);
    // Triggers when user select the date
    const changeSelectedDate = (date, useAutohide) => {
        setSelectedDate(date);
        if (onSelectedDateChanged) {
            onSelectedDateChanged(date);
        }
        if (autoHide && view === Views.Days && useAutohide == true && !inline) {
            setIsOpen(false);
        }
    };
    // Render the DatepickerView* node
    const renderView = (type) => {
        switch (type) {
            case Views.Decades:
                return _jsx(DatepickerViewsDecades, { theme: theme.views.decades });
            case Views.Years:
                return _jsx(DatepickerViewsYears, { theme: theme.views.years });
            case Views.Months:
                return _jsx(DatepickerViewsMonth, { theme: theme.views.months });
            case Views.Days:
            default:
                return _jsx(DatepickerViewsDays, { theme: theme.views.days });
        }
    };
    // Coordinate the next view based on current view (statemachine-like)
    const getNextView = () => {
        switch (view) {
            case Views.Days:
                return Views.Months;
            case Views.Months:
                return Views.Years;
            case Views.Years:
                return Views.Decades;
        }
        return view;
    };
    // Get the view title based on active View
    const getViewTitle = () => {
        switch (view) {
            case Views.Decades:
                return `${startOfYearPeriod(viewDate, 100)} - ${startOfYearPeriod(viewDate, 100) + 90}`;
            case Views.Years:
                return `${startOfYearPeriod(viewDate, 10)} - ${startOfYearPeriod(viewDate, 10) + 9}`;
            case Views.Months:
                return getFormattedDate(language, viewDate, { year: 'numeric' });
            case Views.Days:
            default:
                return getFormattedDate(language, viewDate, { month: 'long', year: 'numeric' });
        }
    };
    // Navigate to prev/next for given view's date by value
    const getViewDatePage = (view, date, value) => {
        switch (view) {
            case Views.Days:
                return new Date(addMonths(date, value));
            case Views.Months:
                return new Date(addYears(date, value));
            case Views.Years:
                return new Date(addYears(date, value * 10));
            case Views.Decades:
                return new Date(addYears(date, value * 100));
            default:
                return new Date(addYears(date, value * 10));
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideDatepicker = datepickerRef?.current?.contains(event.target);
            const clickedInsideInput = inputRef?.current?.contains(event.target);
            if (!clickedInsideDatepicker && !clickedInsideInput) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef, datepickerRef, setIsOpen]);
    return (_jsx(DatepickerContext.Provider, { value: {
            theme,
            language,
            minDate,
            maxDate,
            weekStart,
            isOpen,
            setIsOpen,
            view,
            setView,
            viewDate,
            setViewDate,
            selectedDate,
            setSelectedDate,
            changeSelectedDate,
        }, children: _jsxs("div", { className: twMerge(theme.root.base, className), children: [!inline && (_jsx(TextInput, { theme: theme.root.input, icon: HiCalendar, ref: inputRef, onFocus: () => {
                        if (!isDateEqual(viewDate, selectedDate)) {
                            setViewDate(selectedDate);
                        }
                        setIsOpen(true);
                    }, value: selectedDate && getFormattedDate(language, selectedDate), readOnly: true, ...props })), (isOpen || inline) && (_jsx("div", { ref: datepickerRef, className: twMerge(theme.popup.root.base, inline && theme.popup.root.inline), children: _jsxs("div", { className: theme.popup.root.inner, children: [_jsxs("div", { className: theme.popup.header.base, children: [title && _jsx("div", { className: theme.popup.header.title, children: title }), _jsxs("div", { className: theme.popup.header.selectors.base, children: [_jsx("button", { type: "button", className: twMerge(theme.popup.header.selectors.button.base, theme.popup.header.selectors.button.prev), onClick: () => setViewDate(getViewDatePage(view, viewDate, -1)), children: _jsx(HiArrowLeft, {}) }), _jsx("button", { type: "button", className: twMerge(theme.popup.header.selectors.button.base, theme.popup.header.selectors.button.view), onClick: () => setView(getNextView()), children: getViewTitle() }), _jsx("button", { type: "button", className: twMerge(theme.popup.header.selectors.button.base, theme.popup.header.selectors.button.next), onClick: () => setViewDate(getViewDatePage(view, viewDate, 1)), children: _jsx(HiArrowRight, {}) })] })] }), _jsx("div", { className: theme.popup.view.base, children: renderView(view) }), (showClearButton || showTodayButton) && (_jsxs("div", { className: theme.popup.footer.base, children: [showTodayButton && (_jsx("button", { type: "button", className: twMerge(theme.popup.footer.button.base, theme.popup.footer.button.today), onClick: () => {
                                            const today = new Date();
                                            changeSelectedDate(today, true);
                                            setViewDate(today);
                                        }, children: labelTodayButton })), showClearButton && (_jsx("button", { type: "button", className: twMerge(theme.popup.footer.button.base, theme.popup.footer.button.clear), onClick: () => {
                                            changeSelectedDate(defaultDate, true);
                                            if (defaultDate) {
                                                setViewDate(defaultDate);
                                            }
                                        }, children: labelClearButton }))] }))] }) }))] }) }));
};
Datepicker.displayName = 'Datepicker';
