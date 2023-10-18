export default function convertCurrencyValue(value: string) {
  let formattedValue = ''

  if (value.includes(',')) {
    const splitted = value.split(',');
    formattedValue = `${splitted[0]}.${splitted[1]}`;
  }

  formattedValue = value

  return Number(formattedValue)
}
