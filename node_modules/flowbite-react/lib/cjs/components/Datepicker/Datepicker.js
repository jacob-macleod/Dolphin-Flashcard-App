"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datepicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const TextInput_1 = require("../TextInput");
const DatepickerContext_1 = require("./DatepickerContext");
const Days_1 = require("./Views/Days");
const Decades_1 = require("./Views/Decades");
const Months_1 = require("./Views/Months");
const Years_1 = require("./Views/Years");
const helpers_1 = require("./helpers");
const Datepicker = ({ title, open, inline = false, autoHide = true, // Hide when selected the day
showClearButton = true, labelClearButton = 'Clear', showTodayButton = true, labelTodayButton = 'Today', defaultDate = new Date(), minDate, maxDate, language = 'en', weekStart = helpers_1.WeekStart.Sunday, className, theme: customTheme = {}, onSelectedDateChanged, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().datepicker, customTheme);
    // Default date should respect the range
    defaultDate = (0, helpers_1.getFirstDateInRange)(defaultDate, minDate, maxDate);
    const [isOpen, setIsOpen] = (0, react_1.useState)(open);
    const [view, setView] = (0, react_1.useState)(helpers_1.Views.Days);
    // selectedDate is the date selected by the user
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(defaultDate);
    // viewDate is only for navigation
    const [viewDate, setViewDate] = (0, react_1.useState)(defaultDate);
    const inputRef = (0, react_1.useRef)(null);
    const datepickerRef = (0, react_1.useRef)(null);
    // Triggers when user select the date
    const changeSelectedDate = (date, useAutohide) => {
        setSelectedDate(date);
        if (onSelectedDateChanged) {
            onSelectedDateChanged(date);
        }
        if (autoHide && view === helpers_1.Views.Days && useAutohide == true && !inline) {
            setIsOpen(false);
        }
    };
    // Render the DatepickerView* node
    const renderView = (type) => {
        switch (type) {
            case helpers_1.Views.Decades:
                return (0, jsx_runtime_1.jsx)(Decades_1.DatepickerViewsDecades, { theme: theme.views.decades });
            case helpers_1.Views.Years:
                return (0, jsx_runtime_1.jsx)(Years_1.DatepickerViewsYears, { theme: theme.views.years });
            case helpers_1.Views.Months:
                return (0, jsx_runtime_1.jsx)(Months_1.DatepickerViewsMonth, { theme: theme.views.months });
            case helpers_1.Views.Days:
            default:
                return (0, jsx_runtime_1.jsx)(Days_1.DatepickerViewsDays, { theme: theme.views.days });
        }
    };
    // Coordinate the next view based on current view (statemachine-like)
    const getNextView = () => {
        switch (view) {
            case helpers_1.Views.Days:
                return helpers_1.Views.Months;
            case helpers_1.Views.Months:
                return helpers_1.Views.Years;
            case helpers_1.Views.Years:
                return helpers_1.Views.Decades;
        }
        return view;
    };
    // Get the view title based on active View
    const getViewTitle = () => {
        switch (view) {
            case helpers_1.Views.Decades:
                return `${(0, helpers_1.startOfYearPeriod)(viewDate, 100)} - ${(0, helpers_1.startOfYearPeriod)(viewDate, 100) + 90}`;
            case helpers_1.Views.Years:
                return `${(0, helpers_1.startOfYearPeriod)(viewDate, 10)} - ${(0, helpers_1.startOfYearPeriod)(viewDate, 10) + 9}`;
            case helpers_1.Views.Months:
                return (0, helpers_1.getFormattedDate)(language, viewDate, { year: 'numeric' });
            case helpers_1.Views.Days:
            default:
                return (0, helpers_1.getFormattedDate)(language, viewDate, { month: 'long', year: 'numeric' });
        }
    };
    // Navigate to prev/next for given view's date by value
    const getViewDatePage = (view, date, value) => {
        switch (view) {
            case helpers_1.Views.Days:
                return new Date((0, helpers_1.addMonths)(date, value));
            case helpers_1.Views.Months:
                return new Date((0, helpers_1.addYears)(date, value));
            case helpers_1.Views.Years:
                return new Date((0, helpers_1.addYears)(date, value * 10));
            case helpers_1.Views.Decades:
                return new Date((0, helpers_1.addYears)(date, value * 100));
            default:
                return new Date((0, helpers_1.addYears)(date, value * 10));
        }
    };
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsx)(DatepickerContext_1.DatepickerContext.Provider, { value: {
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
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, tailwind_merge_1.twMerge)(theme.root.base, className), children: [!inline && ((0, jsx_runtime_1.jsx)(TextInput_1.TextInput, { theme: theme.root.input, icon: hi_1.HiCalendar, ref: inputRef, onFocus: () => {
                        if (!(0, helpers_1.isDateEqual)(viewDate, selectedDate)) {
                            setViewDate(selectedDate);
                        }
                        setIsOpen(true);
                    }, value: selectedDate && (0, helpers_1.getFormattedDate)(language, selectedDate), readOnly: true, ...props })), (isOpen || inline) && ((0, jsx_runtime_1.jsx)("div", { ref: datepickerRef, className: (0, tailwind_merge_1.twMerge)(theme.popup.root.base, inline && theme.popup.root.inline), children: (0, jsx_runtime_1.jsxs)("div", { className: theme.popup.root.inner, children: [(0, jsx_runtime_1.jsxs)("div", { className: theme.popup.header.base, children: [title && (0, jsx_runtime_1.jsx)("div", { className: theme.popup.header.title, children: title }), (0, jsx_runtime_1.jsxs)("div", { className: theme.popup.header.selectors.base, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, tailwind_merge_1.twMerge)(theme.popup.header.selectors.button.base, theme.popup.header.selectors.button.prev), onClick: () => setViewDate(getViewDatePage(view, viewDate, -1)), children: (0, jsx_runtime_1.jsx)(hi_1.HiArrowLeft, {}) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, tailwind_merge_1.twMerge)(theme.popup.header.selectors.button.base, theme.popup.header.selectors.button.view), onClick: () => setView(getNextView()), children: getViewTitle() }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, tailwind_merge_1.twMerge)(theme.popup.header.selectors.button.base, theme.popup.header.selectors.button.next), onClick: () => setViewDate(getViewDatePage(view, viewDate, 1)), children: (0, jsx_runtime_1.jsx)(hi_1.HiArrowRight, {}) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: theme.popup.view.base, children: renderView(view) }), (showClearButton || showTodayButton) && ((0, jsx_runtime_1.jsxs)("div", { className: theme.popup.footer.base, children: [showTodayButton && ((0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, tailwind_merge_1.twMerge)(theme.popup.footer.button.base, theme.popup.footer.button.today), onClick: () => {
                                            const today = new Date();
                                            changeSelectedDate(today, true);
                                            setViewDate(today);
                                        }, children: labelTodayButton })), showClearButton && ((0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, tailwind_merge_1.twMerge)(theme.popup.footer.button.base, theme.popup.footer.button.clear), onClick: () => {
                                            changeSelectedDate(defaultDate, true);
                                            if (defaultDate) {
                                                setViewDate(defaultDate);
                                            }
                                        }, children: labelClearButton }))] }))] }) }))] }) }));
};
exports.Datepicker = Datepicker;
exports.Datepicker.displayName = 'Datepicker';
