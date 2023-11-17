export default function convertCurrency(value: string) {
  const formmatedValue = value.replace('R$', '').replace(/\./g, '').replace(',', '.')

  return Number(formmatedValue)
}
