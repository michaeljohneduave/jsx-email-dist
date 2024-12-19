"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const debug_js_1 = require("../debug.js");
const debugProps = debug_js_1.debug.elements.enabled ? { dataType: 'jsx-email/button' } : {};
const Button = ({ href, children, width, height, borderRadius = 0, textColor, backgroundColor, borderColor, borderSize = 1, style, fontSize = 16, align = 'left', withBackground = false, ...props }) => {
    // Logic for arcsize
    // Math.floor(borderRadius / Min(Width, Height))
    const arcsize = Math.floor((borderRadius / height) * 100);
    // Logic for line-height
    // Height - (2 * borderSize)
    const lineHeight = borderSize ? height - 2 * borderSize : height;
    const baseStyles = {
        '-webkit-text-size-adjust': 'none',
        borderRadius,
        display: 'inline-block',
        fontSize,
        lineHeight: `${lineHeight}px`,
        maxWidth: width,
        textAlign: 'center',
        textDecoration: 'none',
        width: '100%'
    };
    // border styling
    const borderStyles = {
        border: `${borderSize}px solid ${borderColor}`,
        // @ts-ignore: valid prop `mso-border-alt:none;`
        msoBorderAlt: 'none'
    };
    const propStyles = {
        // border styles
        ...(borderColor ? borderStyles : {}),
        // background styles
        ...(backgroundColor ? { backgroundColor } : {}),
        // text styles
        ...(textColor ? { color: textColor } : {})
    };
    const baseButton = ((0, jsx_runtime_1.jsx)("a", { href: href, style: {
            ...baseStyles,
            ...propStyles,
            ...style,
            ...(withBackground ? {} : { msoHide: 'all' })
        }, ...props, children: children }));
    return ((0, jsx_runtime_1.jsx)("table", { ...debugProps, width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, style: { borderCollapse: 'collapse' }, role: "presentation", children: (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsxs)("td", { align: align, children: [!withBackground && ((0, jsx_runtime_1.jsx)("span", { dangerouslySetInnerHTML: {
                            __html: `<!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arcsize}%" ${borderColor ? `strokecolor=${borderColor}` : ''} ${borderSize ? `strokeweight="${borderSize}px"` : `stroke="false"`} ${backgroundColor ? `fillcolor=${backgroundColor}` : `fill="false"`}>
            <w:anchorlock/>
            <center style="font-size:${fontSize}px;${textColor ? `color:${textColor};` : ''}">
            ${children}
            </center></v:roundrect>
            <![endif]-->`
                        } })), withBackground ? ((0, jsx_runtime_1.jsx)("table", { align: align, width: width, border: 0, cellPadding: 0, cellSpacing: 0, role: "presentation", children: (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { 
                                // @ts-ignore: `bgcolor` not documented
                                bgcolor: backgroundColor, width: width, height: height, style: {
                                    borderRadius,
                                    height,
                                    maxWidth: width,
                                    textAlign: 'center',
                                    width
                                }, children: baseButton }) }) })) : (baseButton)] }) }) }));
};
exports.Button = Button;
//# sourceMappingURL=button.js.map