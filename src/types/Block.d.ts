type BlockType =
  'STATEMENT'
  | 'CONDITIONS'
  | 'BOXED'
  | 'EXAMPLES'
  | 'CHOICES'
  | 'IMAGE'

interface BlockContent {
  STATEMENT: string;
  CONDITIONS: string[];
  BOXED: string;
  EXAMPLES: string[];
  CHOICES: string[];
  IMAGE: string;
}

export interface BlockScheme {
  id: string;
  type: BlockType;
  content: BlockContent[BlockType];
}
