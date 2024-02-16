import { createElement } from 'react';
import genericForwardRef from '../../helpers/generic-forward-ref';
const ButtonBaseComponent = ({ children, as: Component, href, type = 'button', ...props }, ref) => {
    const BaseComponent = Component || (href ? 'a' : 'button');
    return createElement(BaseComponent, { ref, href, type, ...props }, children);
};
export const ButtonBase = genericForwardRef(ButtonBaseComponent);
