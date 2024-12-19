import React from 'react';
import type { JsxEmailComponent } from '../types.js';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'jsx-email-raw': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
        }
    }
}
export interface RawProps {
    content: string;
    disablePlainTextOutput?: boolean;
}
export declare const Raw: JsxEmailComponent<RawProps>;
//# sourceMappingURL=raw.d.ts.map