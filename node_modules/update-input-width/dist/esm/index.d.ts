/**
 * Gets font CSS shorthand property given element.
 *
 * @param {HTMLElement} element Element to get font CSS shorthand property from
 */
export declare function getFontShorthand(element: HTMLElement): string;
/**
 * Measures text width given text and font CSS shorthand.
 *
 * @param {string} text Text to measure
 * @param {string} font Font to use when measuring the text
 */
export declare function measureText(text: string, font: string): number | null;
/**
 * Updates input element width to fit its content given input element
 * @param {HTMLInputElement} element
 */
export declare function updateInputWidth(element: HTMLInputElement): number | null;
export default updateInputWidth;
