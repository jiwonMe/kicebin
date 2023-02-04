interface DocumentScheme {
  id: string;
  meta: {
    title: string;
    description: string;
    pagination: boolean;
  }
  problems: ProblemScheme[];
}
