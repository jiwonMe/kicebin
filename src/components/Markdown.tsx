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
  // rehypePlugins: [
  //   rehypeTeX,
  // ],
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
        // '\\nvec': '\\vec',
        // '\\vec': '\\nvec{\\vphantom A\\smash{#1}}',
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
    let isCorrect = false;
    if (node.children && isKaTeX) {
      node.children.forEach((child: any) => {
        if (child.type === 'text') {
          isText = true;
          // node.properties.style = 'transform: scaleX(0.95) translateX(-2.5%);';
        }
        if (child.value === '−' || child.value === '+') {
          isCorrect = true;
          // style = { color: 'red' };
          node.properties.style = 'margin: 0 0.1em; font: normal 1.21em KaTeX_Main, Times New Roman, serif; zoom: 0.8';
          // console.log(node);
        } else {
          // regex a-z
          if (child.value?.match(/[a-z]/)) {
            isCorrect = true;
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
            isCorrect = true;
            node.properties.style = '';
            // console.log(node);
          } else if (child.value?.match('') || child.value?.match('=') || child.value?.match('∣')) {
            isCorrect = true;
            node.properties.style = 'font: normal 1.21em KaTeX_Main, Times New Roman, serif; zoom: 0.8';
            // console.log(node);
          } else if (child.value?.match(/α|β|γ|δ|ε|ζ|η|θ|ι|κ|λ|μ|ν|ξ|ο|π|ρ|σ|τ|υ|φ|χ|ψ|ω/)) {
            isCorrect = true;
            // console.log(node);
            // add unicode value + 10
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
            // node.child.value = child.value.replace(/[ɑ-ɯ]/, '');
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

// rehype plugin that converts <span class='math'> tags to <img> tags
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
// };
