import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMathJax from 'rehype-mathjax';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import temml from '../utils/temml/temml';

const _mapProps = (props: any): ReactMarkdownOptions => ({
  ...props,
  remarkPlugins: [
    remarkMath,
  ],
  rehypePlugins: [
    [rehypeTemml],
    // rehypeSanitize,
  ]
  // rehypePlugins: [
  //   [ rehypeKatex, {
  //     output: 'html',
  //     displayMode: true,
  //     minRuleThickness: 0.04,
  //     strict: false,
  //     macros: {
  //       '\\RR': '\\mathbb{R}',
  //       '\\ZZ': '\\mathbb{Z}',
  //       '\\CC': '\\mathbb{C}',
  //       '\\QQ': '\\mathbb{Q}',
  //       '\\mrm': '\\mathrm',
  //       '\\eps': '\\varepsilon',
  //       '\\dsum': '\\displaystyle\\sum',
  //       '\\dprod': '\\displaystyle\\prod',
  //       '\\dint': '\\displaystyle\\int',
  //       '\\dlim': '\\displaystyle\\lim',
  //     },
  //     globalGroup: true,
  //     // throwOnError: false,
  //   }],
  //   // [rehypeLog, {
  //   //   mode: props.mode,
  //   // }],
  // ]
  // rehypePlugins: [
  //   [rehypeMathJax, {
  //     jax: ['input/TeX','output/HTML-CSS'],
  //     chtml: {
  //       fontURL: '[mathjax]/components/output/chtml/fonts/woff-v2'
  //     },
  //     Hub: {
  //       webfont: 'Latin-Modern'
  //     }
  //   }]
  // ],
});


// htmlGenerator = parse('Hi', { generator: htmlGenerator });

// console.log(htmlGenerator.domFragment());


const Markdown = (props: any) => <ReactMarkdown {..._mapProps(props)}/>;

export default Markdown;

// rehype plugin that console logs the tree

// rehype plugin that converts <span class='math'> tags to <img> tags
const rehypeTeX = (options: any) => (tree: any) => {
  const visit = (node: any) => {
    if (node.type === 'element' && node.tagName === 'span' && node.properties.className.includes('math')) {
      node.tagName = 'img';
      node.properties.src = `https://latex.codecogs.com/svg.latex?${encodeURIComponent(node.children[0].value)}`;
      node.properties.alt = node.children[0].value;
      delete node.properties.className;
      delete node.children;

      return node;
    }
  };
  visit(tree);
};


const rehypeTemml = (options: any) => (tree: any) => {
  // console.log(tree);
  const visit = (node: any) => {
    if (node.type === 'element' && node.properties.className?.includes('math')) {

      // console.log(node);

      const macros = temml.definePreamble(
        `\\newcommand\\d[0]{\\operatorname{d}\\!}
        \\renewcommand{\\vec}[1]{\\vv{#1}}
\\let\\nvec\\vec
\\let\\nsqrt\\sqrt
\\def\\vec#1{\\nvec{\\vphantom A\\smash{#1}}} %%%% 낮추려면 vphantom t
\\def\\SQRT#1{\\nsqrt{\\vphantom{B}\\smash{#1}}} %%%% 낮추려면 vphantom t
        `
      );

      const element = document.createElement('span');
      temml.render(node.children[0].value, element, {
        displayMode: true,
        macros,
      });
      temml.postProcess(element);

      // console.log(element);
      // convert html element to rehype node
      const convert = (element: Element) => {
        const node: any = {
          type: 'element',
          tagName: element.tagName.toLowerCase(),
          properties: {},
          children: [],
        };

        if (element.attributes) {
          for (let i = 0; i < element.attributes.length; i++) {
            const attribute = element.attributes[i];
            node.properties[attribute.name] = attribute.value;
          }
        }

        if (element.childNodes) {
          for (let i = 0; i < element.childNodes.length; i++) {
            const child = element.childNodes[i];
            if (child instanceof Element) {
              node.children.push(convert(child));
            } else if (child instanceof Text) {
              const textNode = {
                type: 'text',
                value: child.textContent,
                properties: {
                  style: ''
                },
              };

              // if (child.textContent?.includes('\'')) {
              //   textNode.properties.style = 'font-family: "Times New Roman", Times, serif;';
              // }
              node.children.push(textNode);
            }
          }
        }

        return node;
      };

      const newNode = convert(element.children.item(0) as HTMLElement);

      node.children = [newNode];

      // node.children[0].value = element.innerHTML;
      // return newNode;
    } else if (node.children) {
      node.children.forEach((child: any) => {
        visit(child);
      });
    }
  };

  visit(tree);
  console.log(tree);
};



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
