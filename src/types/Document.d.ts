interface DocumentScheme {
  id: string;
  meta: {
    title: string;
    description: string;
    pagination: boolean;
    createdAt: string;
    updatedAt: string;
  }
  problems: ProblemScheme[];
}
