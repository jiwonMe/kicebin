import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css';

const _mapProps = (props: any) => ({
  ...props,
  escapeHtml: false,
  remarkPlugins: [
    remarkMath
  ],
  rehypePlugins: [
    [ rehypeKatex, {
      output: 'htmlAndMathml',
      displayMode: true,
      minRuleThickness: 0.01,
      strict: false,
    }]
  ],
});

const Markdown = (props: any) => <ReactMarkdown {..._mapProps(props)} />

export default Markdown;