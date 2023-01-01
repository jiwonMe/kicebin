interface ProblemSchema {
  id: number,
  problemNumber: string,
  question: string,
  examples: {
    first: string,
    second: string,
    third: string,
  }
  choices: string[],
}