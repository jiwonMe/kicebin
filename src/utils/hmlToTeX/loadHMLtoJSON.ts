
function loadHmlFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // xml parse
      const parser = new DOMParser();
      const hml = parser.parseFromString(reader.result as string, 'text/xml');
      // resolve(hml);

      // xml to json
      const xmlToJson = (xml: any) => {
        let obj: any = {};
        if (xml.nodeType === 1) {
          if (xml.attributes.length > 0) {
            obj['@attributes'] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
              const attribute = xml.attributes.item(j);
              obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType === 3) {
          obj = xml.nodeValue;
        }
        if (xml.hasChildNodes()) {
          for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;
            if (typeof obj[nodeName] === 'undefined') {
              obj[nodeName] = xmlToJson(item);
            } else {
              if (typeof obj[nodeName].push === 'undefined') {
                const old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
            }
          }
        }
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
