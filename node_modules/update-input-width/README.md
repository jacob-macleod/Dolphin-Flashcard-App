[![npm](https://img.shields.io/npm/v/update-input-width.svg)](https://www.npmjs.com/package/update-input-width) ![downloads](https://img.shields.io/npm/dt/update-input-width.svg) [![CI](https://github.com/wojtekmaj/update-input-width/workflows/CI/badge.svg)](https://github.com/wojtekmaj/update-input-width/actions)

# Update-Input-Width

A function that given an input element, updates its width to fit its content.

## tl;dr

- Install by executing `npm install update-input-width` or `yarn add update-input-width`.
- Import by adding `import updateInputWidth from 'update-input-width'`.
- Use it by calling it with input element as an argument.

## User guide

### `updateInputWidth(element: HTMLInputElement)`

A function that given an input element, updates its width to fit its content by setting inline `width` CSS property.

#### Sample usage

```ts
import updateInputWidth from 'update-input-width';

updateInputWidth(myInput); // 42
```

or

```ts
import { updateInputWidth } from 'update-input-width';

updateInputWidth(myInput); // 42
```

### `getFontShorthand(element: HTMLElement)`

A function that given HTML element returns font CSS shorthand property. Equal to Chrome-only code:

```ts
window.getComputedStyle(element).font;
```

#### Sample usage

```ts
import { getFontShorthand } from 'update-input-width';

getFontShorthand(myInput); // 'normal normal 600 normal 20px / 25px Arial, sans-serif'
```

### `measureText(text: string, font: string)`

A function that given text and font CSS shorthand property returns text width in pixels.

#### Sample usage

```ts
import { measureText } from 'update-input-width';

measureText('hello', 'normal normal 600 normal 20px / 25px Arial, sans-serif'); // 42
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>
