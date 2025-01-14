import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import type { HighlightResult } from 'highlight.js';


export function highlight(code: string): HighlightResult {
    hljs.registerLanguage('typescript', typescript);
    return hljs.highlight(code, { language: 'typescript' });
}