type BlockType =
  'STATEMENT'
  | 'CONDITIONS'
  | 'BOXED'
  | 'EXAMPLES'
  | 'CHOICES'

interface BlockContent {
  STATEMENT: string;
  CONDITIONS: string[];
  BOXED: string;
  EXAMPLES: string[];
  CHOICES: string[];
}

interface BlockScheme {
  id: string;
  type: BlockType;
  content: BlockContent[BlockType];
}
