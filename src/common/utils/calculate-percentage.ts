/**
 * getting the percentage rounded to two decimal places
 * @param partialValue calculated value
 * @param totalValue total number
 * @return number
 */
export function calculatePercentage(partialValue: number, totalValue: number): number {
  return parseFloat(((100 * partialValue) / totalValue).toFixed(2));
}
