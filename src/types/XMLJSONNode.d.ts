interface XMLJSONNode {
  '@attributes': {
    [key: string]: string;
  };
  tagName: string;
  value?: string;
  childNodes?: XMLJSONNode[];
  pwd?: string[];
}
