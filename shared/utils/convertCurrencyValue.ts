export default function convertCurrencyValue(value: string) {
  let formattedValue = '';
  let fullvalue = '';

  if (value.includes('.')) {
    const splitted = value.split('.');
    for (let val of splitted) {
      fullvalue += val;
    }

    value = fullvalue;
  }

  if (value.includes(',')) {
    const splitted = value.split(',');
    formattedValue = `${splitted[0]}.${splitted[1]}`;
    return Number(formattedValue);
  }

  return Number(value);
}
