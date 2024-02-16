const allowedVariants = ['normal', 'small-caps'];

/**
 * Gets font CSS shorthand property given element.
 *
 * @param {HTMLElement} element Element to get font CSS shorthand property from
 */
export function getFontShorthand(element: HTMLElement): string {
  if (!element) {
    return '';
  }

  const style = window.getComputedStyle(element);

  if (style.font) {
    return style.font;
  }

  const isFontDefined = style.fontFamily !== '';

  if (!isFontDefined) {
    return '';
  }

  const fontVariant = allowedVariants.includes(style.fontVariant) ? style.fontVariant : 'normal';

  return `${style.fontStyle} ${fontVariant} ${style.fontWeight} ${style.fontSize} / ${style.lineHeight} ${style.fontFamily}`;
}

let cachedCanvas: HTMLCanvasElement;

/**
 * Measures text width given text and font CSS shorthand.
 *
 * @param {string} text Text to measure
 * @param {string} font Font to use when measuring the text
 */
export function measureText(text: string, font: string) {
  const canvas: HTMLCanvasElement =
    cachedCanvas || (cachedCanvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');

  // Context type not supported
  if (!context) {
    return null;
  }

  context.font = font;
  const { width } = context.measureText(text);

  return Math.ceil(width);
}

/**
 * Updates input element width to fit its content given input element
 * @param {HTMLInputElement} element
 */
export function updateInputWidth(element: HTMLInputElement) {
  if (typeof document === 'undefined' || !element) {
    return null;
  }

  const font = getFontShorthand(element);
  const text = element.value || element.placeholder;
  const width = measureText(text, font);

  if (width === null) {
    return null;
  }

  element.style.width = `${width}px`;
  return width;
}

export default updateInputWidth;
