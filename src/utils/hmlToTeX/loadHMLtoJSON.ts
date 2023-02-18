


function loadHmlFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // xml parse
      const parser = new DOMParser();
      const hml = parser.parseFromString(reader.result as string, 'text/xml');
      // resolve(hml);

      // xml to json

      const xmlToJson = (xml: Document): XMLJSONNode => {
        const obj: XMLJSONNode = {
          '@attributes': {},
          tagName: 'ROOT',
          childNodes: [],
        };

        const parseNode = (node: Node, obj: XMLJSONNode): void => {
          // console.log(node);
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            const childObj: XMLJSONNode = {
              '@attributes': {},
              tagName: element.tagName,
              childNodes: [],
            };
            obj.childNodes?.push(childObj);

            if (element.attributes) {
              for (let i = 0; i < element.attributes.length; i++) {
                const attr = element.attributes.item(i);
                if (attr) {
                  childObj['@attributes'][attr.name] = attr.value;
                }
              }
            }

            const childNodes = element.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
              parseNode(childNodes.item(i), childObj);
            }
          } else if (node.nodeType === Node.TEXT_NODE) {
            const textNode = node as Text;

            const childObj: XMLJSONNode = {
              '@attributes': {},
              tagName: 'LITERAL',
              value: textNode.data,
            };
            obj.childNodes?.push(childObj);
          } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
            const cdataNode = node as CDATASection;

            const childObj: XMLJSONNode = {
              '@attributes': {},
              tagName: 'LITERAL',
              value: cdataNode.data,
            };
            obj.childNodes?.push(childObj);
          }
        };

        const childNodes = xml.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          parseNode(childNodes.item(i), obj);
        }

        console.log(obj);
        return obj;
      };

      const json = xmlToJson(hml);
      resolve(json);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export default loadHmlFile;
