"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Font = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/** The component MUST be place inside the <head> tag */
const Font = ({ fontFamily, fallbackFontFamily, webFont, fontStyle = 'normal', fontWeight = 400 }) => {
    const src = webFont ? `src: url(${webFont.url}) format('${webFont.format}');` : '';
    const style = `
    @font-face {
      font-family: '${fontFamily}';
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      mso-font-alt: '${Array.isArray(fallbackFontFamily) ? fallbackFontFamily[0] : fallbackFontFamily}';
      ${src}
    }

    * {
      font-family: '${fontFamily}', ${Array.isArray(fallbackFontFamily) ? fallbackFontFamily.join(', ') : fallbackFontFamily};
    }
  `;
    return (0, jsx_runtime_1.jsx)("style", { dangerouslySetInnerHTML: { __html: style } });
};
exports.Font = Font;
exports.Font.displayName = 'Font';
//# sourceMappingURL=font.js.map