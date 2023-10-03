export function getEnumValues(pEnum: any) {
  return Object.values(pEnum);
}

export function translateMeasurementUnit(unit: string) {
  switch (unit) {
    case 'sc':
      return 'Sacos';
    case 'ton':
      return 'Toneladas';
    case 'kg':
      return 'Kg';
    case 'g':
      return 'G';
    case 'l':
      return 'L';
    case 'ml':
      return 'Ml';
  }
}
