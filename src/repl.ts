export function cleanInput(input: string): Array<string> {
  return input.toLowerCase().trim().replace(/ +/g, " ").split(" ");
}
