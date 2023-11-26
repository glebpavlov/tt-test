/**
 * calculate the arithmetic average rounded to two decimal places
 * @param numbers
 */
export function averageNumber(numbers: number[]): number {
  return parseFloat((numbers.reduce((acc, number) => acc + number, 0) / numbers.length).toFixed(2));

}
