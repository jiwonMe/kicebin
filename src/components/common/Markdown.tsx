import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

const _mapProps = (props: any): ReactMarkdownOptions => ({
  ...props,
  remarkPlugins: [
    remarkMath,
  ],
  rehypePlugins: [
    [ rehypeKatex, {
      output: 'html',
      displayMode: true,
      minRuleThickness: 0.04,
      strict: false,
      macros: {
        '\\RR': '\\mathbb{R}',
        '\\ZZ': '\\mathbb{Z}',
        '\\CC': '\\mathbb{C}',
        '\\QQ': '\\mathbb{Q}',
        '\\mrm': '\\mathrm',
        '\\eps': '\\varepsilon',
        '\\dsum': '\\displaystyle\\sum',
        '\\dprod': '\\displaystyle\\prod',
        '\\dint': '\\displaystyle\\int',
        '\\dlim': '\\displaystyle\\lim',
      },
      globalGroup: true,
    }],
  ]
});


const Markdown = (props: any) => <ReactMarkdown {..._mapProps(props)}/>;

export default Markdown;