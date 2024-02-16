import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import { PaginationButton, PaginationNavigation } from './PaginationButton';
import { range } from './helpers';
const PaginationComponent = ({ className, currentPage, layout = 'pagination', nextLabel = 'Next', onPageChange, previousLabel = 'Previous', renderPaginationButton = (props) => _jsx(PaginationButton, { ...props }), showIcons: showIcon = false, theme: customTheme = {}, totalPages, ...props }) => {
    const theme = mergeDeep(getTheme().pagination, customTheme);
    const lastPage = Math.min(Math.max(layout === 'pagination' ? currentPage + 2 : currentPage + 4, 5), totalPages);
    const firstPage = Math.max(1, lastPage - 4);
    const goToNextPage = () => {
        onPageChange(Math.min(currentPage + 1, totalPages));
    };
    const goToPreviousPage = () => {
        onPageChange(Math.max(currentPage - 1, 1));
    };
    return (_jsxs("nav", { className: twMerge(theme.base, className), ...props, children: [layout === 'table' && (_jsxs("div", { className: theme.layout.table.base, children: ["Showing ", _jsx("span", { className: theme.layout.table.span, children: firstPage }), " to\u00A0", _jsx("span", { className: theme.layout.table.span, children: lastPage }), " of\u00A0", _jsx("span", { className: theme.layout.table.span, children: totalPages }), " Entries"] })), _jsxs("ul", { className: theme.pages.base, children: [_jsx("li", { children: _jsxs(PaginationNavigation, { className: twMerge(theme.pages.previous.base, showIcon && theme.pages.showIcon), onClick: goToPreviousPage, disabled: currentPage === 1, children: [showIcon && _jsx(HiChevronLeft, { "aria-hidden": true, className: theme.pages.previous.icon }), previousLabel] }) }), layout === 'pagination' &&
                        range(firstPage, lastPage).map((page) => (_jsx("li", { "aria-current": page === currentPage ? 'page' : undefined, children: renderPaginationButton({
                                className: twMerge(theme.pages.selector.base, currentPage === page && theme.pages.selector.active),
                                active: page === currentPage,
                                onClick: () => onPageChange(page),
                                children: page,
                            }) }, page))), _jsx("li", { children: _jsxs(PaginationNavigation, { className: twMerge(theme.pages.next.base, showIcon && theme.pages.showIcon), onClick: goToNextPage, disabled: currentPage === totalPages, children: [nextLabel, showIcon && _jsx(HiChevronRight, { "aria-hidden": true, className: theme.pages.next.icon })] }) })] })] }));
};
PaginationComponent.displayName = 'Pagination';
export const Pagination = Object.assign(PaginationComponent, {
    Button: PaginationButton,
});
