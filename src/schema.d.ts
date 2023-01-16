interface ProblemSchema {
  id: number,
  problemNumber: string,
  question: string,
  question2: string,
  conditions: string[],
  examples: {
    first: string,
    second: string,
    third: string,
  }
  choices: string[],
}