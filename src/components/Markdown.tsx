import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import rehypeKatex from 'rehype-katex';
import rehypeMathJax from 'rehype-mathjax';
import 'katex/dist/katex.min.css';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

const _mapProps = (props: ReactMarkdownOptions): ReactMarkdownOptions => ({
  ...props,
  remarkPlugins: [
    remarkMath,
  ],
  // rehypePlugins: [
  //   rehypeTeX,
  // ],
  rehypePlugins: [
    [ rehypeKatex, {
      output: 'html',
      displayMode: true,
      // minRuleThickness: 0.001,
      strict: false,
      macros: {
        '\\RR': '\\mathbb{R}',
        '\\ZZ': '\\mathbb{Z}',
        '\\CC': '\\mathbb{C}',
        '\\QQ': '\\mathbb{Q}',
        '\\mrm': '\\mathrm',
        // '\\nvec': '\\vec',
        // '\\vec': '\\nvec{\\vphantom A\\smash{#1}}',
      },
      globalGroup: true,
    }]
  ]
});


// htmlGenerator = parse('Hi', { generator: htmlGenerator });

// console.log(htmlGenerator.domFragment());

const Markdown = (props: any) => <ReactMarkdown {..._mapProps(props)} />;

export default Markdown;

// // rehype plugin that converts <span class='math'> tags to <img> tags
// const rehypeTeX = (options: any) => (tree: any) => {
//   const visit = (node: any) => {
//     if (node.type === 'element' && node.tagName === 'span' && node.properties.className.includes('math')) {
//       node.tagName = 'img';
//       node.properties.src = `https://latex.codecogs.com/svg.latex?${encodeURIComponent(node.children[0].value)}`;
//       node.properties.alt = node.children[0].value;
//       delete node.properties.className;
//       delete node.children;

//       return node;
//     }
//   };
//   visit(tree);
//   // visit(tree, visit);
// };
