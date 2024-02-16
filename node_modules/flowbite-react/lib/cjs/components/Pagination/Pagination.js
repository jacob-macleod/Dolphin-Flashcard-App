"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hi_1 = require("react-icons/hi");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const theme_store_1 = require("../../theme-store");
const PaginationButton_1 = require("./PaginationButton");
const helpers_1 = require("./helpers");
const PaginationComponent = ({ className, currentPage, layout = 'pagination', nextLabel = 'Next', onPageChange, previousLabel = 'Previous', renderPaginationButton = (props) => (0, jsx_runtime_1.jsx)(PaginationButton_1.PaginationButton, { ...props }), showIcons: showIcon = false, theme: customTheme = {}, totalPages, ...props }) => {
    const theme = (0, merge_deep_1.mergeDeep)((0, theme_store_1.getTheme)().pagination, customTheme);
    const lastPage = Math.min(Math.max(layout === 'pagination' ? currentPage + 2 : currentPage + 4, 5), totalPages);
    const firstPage = Math.max(1, lastPage - 4);
    const goToNextPage = () => {
        onPageChange(Math.min(currentPage + 1, totalPages));
    };
    const goToPreviousPage = () => {
        onPageChange(Math.max(currentPage - 1, 1));
    };
    return ((0, jsx_runtime_1.jsxs)("nav", { className: (0, tailwind_merge_1.twMerge)(theme.base, className), ...props, children: [layout === 'table' && ((0, jsx_runtime_1.jsxs)("div", { className: theme.layout.table.base, children: ["Showing ", (0, jsx_runtime_1.jsx)("span", { className: theme.layout.table.span, children: firstPage }), " to\u00A0", (0, jsx_runtime_1.jsx)("span", { className: theme.layout.table.span, children: lastPage }), " of\u00A0", (0, jsx_runtime_1.jsx)("span", { className: theme.layout.table.span, children: totalPages }), " Entries"] })), (0, jsx_runtime_1.jsxs)("ul", { className: theme.pages.base, children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(PaginationButton_1.PaginationNavigation, { className: (0, tailwind_merge_1.twMerge)(theme.pages.previous.base, showIcon && theme.pages.showIcon), onClick: goToPreviousPage, disabled: currentPage === 1, children: [showIcon && (0, jsx_runtime_1.jsx)(hi_1.HiChevronLeft, { "aria-hidden": true, className: theme.pages.previous.icon }), previousLabel] }) }), layout === 'pagination' &&
                        (0, helpers_1.range)(firstPage, lastPage).map((page) => ((0, jsx_runtime_1.jsx)("li", { "aria-current": page === currentPage ? 'page' : undefined, children: renderPaginationButton({
                                className: (0, tailwind_merge_1.twMerge)(theme.pages.selector.base, currentPage === page && theme.pages.selector.active),
                                active: page === currentPage,
                                onClick: () => onPageChange(page),
                                children: page,
                            }) }, page))), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(PaginationButton_1.PaginationNavigation, { className: (0, tailwind_merge_1.twMerge)(theme.pages.next.base, showIcon && theme.pages.showIcon), onClick: goToNextPage, disabled: currentPage === totalPages, children: [nextLabel, showIcon && (0, jsx_runtime_1.jsx)(hi_1.HiChevronRight, { "aria-hidden": true, className: theme.pages.next.icon })] }) })] })] }));
};
PaginationComponent.displayName = 'Pagination';
exports.Pagination = Object.assign(PaginationComponent, {
    Button: PaginationButton_1.PaginationButton,
});
