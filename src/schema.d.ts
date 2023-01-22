interface ProblemSchema {
  id: string,
  problemNumber: string,
  question: string,
  question2: string,
  conditions: string[],
  boxed: string,
  examples: {
    first: string,
    second: string,
    third: string,
  }
  choices: string[],
}