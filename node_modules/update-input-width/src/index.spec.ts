import { describe, expect, it, vi } from 'vitest';

import updateInputWidthDefault, {
  updateInputWidth,
  getFontShorthand,
  measureText,
} from './index.js';

import type { SpyInstance } from 'vitest';

it('exports updateInputWidth() by default', () => {
  expect(updateInputWidthDefault).toBeDefined();
  expect(updateInputWidthDefault).toBe(updateInputWidth);
});

describe('updateInputWidth()', () => {
  it('does nothing and returns null when passed nothing', () => {
    // @ts-expect-error-next-line
    const result = updateInputWidth();

    expect(result).toBe(null);
  });

  it('sets valid width given empty input with placeholder', () => {
    const element = document.createElement('input');
    element.style.fontFamily = 'Arial';
    element.style.fontSize = '20px';

    const result = updateInputWidth(element);

    expect(result).toEqual(expect.any(Number));
  });
});

describe('getFontShorthand()', () => {
  it('returns empty string when passed nothing', () => {
    // @ts-expect-error-next-line
    const result = getFontShorthand();

    expect(result).toBe('');
  });

  it('returns valid font shorthand for a given element', () => {
    const element = document.createElement('input');
    element.style.fontFamily = 'Arial';
    element.style.fontSize = '20px';

    const result = getFontShorthand(element);

    expect(result).toEqual(expect.any(String));
  });

  it('returns valid font shorthand if given font', () => {
    const mockGetComputedStyle = vi.spyOn(global.window, 'getComputedStyle');
    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockImplementation(() => ({
      font: 'normal normal 400 20px / 25px Arial',
      fontFamily: 'Arial',
      fontSize: '20px',
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: '400',
      lineHeight: '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal normal 400 20px / 25px Arial');

    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockClear();
  });

  it('returns valid font shorthand if not given font', () => {
    const mockGetComputedStyle = vi.spyOn(global.window, 'getComputedStyle');
    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockImplementation(() => ({
      font: '',
      fontFamily: 'Arial',
      fontSize: '20px',
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: '400',
      lineHeight: '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal normal 400 20px / 25px Arial');

    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockClear();
  });

  it('returns valid font shorthand if given allowed font-variant', () => {
    const mockGetComputedStyle = vi.spyOn(global.window, 'getComputedStyle');
    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockImplementation(() => ({
      font: '',
      fontFamily: 'Arial',
      fontSize: '20px',
      fontStyle: 'normal',
      fontVariant: 'small-caps',
      fontWeight: '400',
      lineHeight: '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal small-caps 400 20px / 25px Arial');

    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockClear();
  });

  it('returns valid font shorthand if given allowed font-variant', () => {
    const mockGetComputedStyle = vi.spyOn(global.window, 'getComputedStyle');
    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockImplementation(() => ({
      font: '',
      fontFamily: 'Arial',
      fontSize: '20px',
      fontStyle: 'normal',
      fontVariant: 'tabular-nums',
      fontWeight: '400',
      lineHeight: '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal normal 400 20px / 25px Arial');

    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockClear();
  });

  it('returns empty string for an element without styles', () => {
    const mockGetComputedStyle = vi.spyOn(global.window, 'getComputedStyle');
    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockImplementation(() => ({
      font: '',
      fontFamily: '',
      fontSize: '',
      fontStyle: '',
      fontVariant: '',
      fontWeight: '',
      lineHeight: '',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('');

    (
      mockGetComputedStyle as SpyInstance<
        [elt: Element, pseudoElt?: string | null | undefined],
        Partial<CSSStyleDeclaration>
      >
    ).mockClear();
  });
});

describe('measureText()', () => {
  it('returns valid measurement given text and font CSS shorthand', () => {
    const text = 'Hello world';
    const font = 'normal normal 600 normal 20px / 25px Arial, sans-serif';

    const result = measureText(text, font);

    expect(result).toEqual(expect.any(Number));
  });
});
