import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMathJax from 'rehype-mathjax';
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
      // throwOnError: false,
    }],
    [rehypeLog, {
      mode: props.mode,
    }],
  ]
  // rehypePlugins: [
  //   [rehypeMathJax, {
  //     chtml: {
  //       fontURL: '[mathjax]/components/output/chtml/fonts/woff-v2'
  //     }
  //   }]
  // ],
});


// htmlGenerator = parse('Hi', { generator: htmlGenerator });

// console.log(htmlGenerator.domFragment());

const Markdown = (props: any) => <ReactMarkdown {..._mapProps(props)} />;

export default Markdown;

// rehype plugin that console logs the tree

const rehypeLog = (options: any) => (tree: any) => {
  // console.log(tree);
  // if value is 'x' then replace it with 'y'
  const visit = (node: any, isInKaTeX: boolean) => {
    let isKaTeX = isInKaTeX;
    let isText = false;

    if (node.children && isKaTeX) {
      node.children.forEach((child: any) => {
        if (child.type === 'text') {
          isText = true;
        }
        if (child.value === '−' || child.value === '+') {
          node.properties.style = 'margin: 0 0.1em; font: normal 1.21em KaTeX_Main, Times New Roman, serif; zoom: 0.8';
        } else {
          // regex a-z
          if (child.value?.match(/[a-z]/)) {
            node.properties.style = 'margin-right: 0.05em;';
            // if (options.mode === 'print') {
            //   node.children[0].value = child.value.replaceAll(/[A-z]/g, (match: string) => {
            //     const charCode = match.charCodeAt(0);
            //     return String.fromCharCode(charCode + (
            //       // U+0061 to U+E0E5
            //       0xE0E5 - 0x0061
            //     ));
            //   });
            // }
            // console.log(node);
          } else if (child.value?.match(/[A-Z]/)) {
            node.properties.style = '';
          } else if (child.value?.match('') || child.value?.match('=') || child.value?.match('∣')) {
            node.properties.style = 'font: normal 1.21em KaTeX_Main, Times New Roman, serif; zoom: 0.8';
          } else if (child.value?.match(/α|β|γ|δ|ε|ζ|η|θ|ι|κ|λ|μ|ν|ξ|ο|π|ρ|σ|τ|υ|φ|χ|ψ|ω/)) {
            node.children[0].value = child.value.replaceAll(/α|β|γ|δ|ϵ|ε|ζ|η|θ|ι|κ|λ|μ|ν|ξ|ο|π|ρ|σ|τ|υ|φ|ϕ|χ|ψ|ω/g, (match: string) => {
              return {
                'α': '',
                'β': '',
                'γ': '',
                'δ': '',
                'ϵ': '',
                'ε': '',
                'ζ': '',
                'η': '',
                'θ': '',
                'ι': '',
                'κ': '',
                'λ': '',
                'μ': '',
                'ν': '',
                'ξ': '',
                'ο': '',
                'π': '',
                'ρ': '',
                'σ': '',
                'τ': '',
                'υ': '',
                'φ': '',
                'ϕ': '',
                'χ': '',
                'ψ': '',
                'ω': '',
              }[match];
            });
            console.log(node);
            node.properties.className.push('mathgreek');
          }
        }
      });
    }
    if(node.properties?.className?.includes('katex')) {
      isKaTeX = true;
    }
    if (node.children) {
      node.children.forEach((child: any) => {
        visit(child, isKaTeX);
      });
    }
  };

  visit(tree, false);
};
