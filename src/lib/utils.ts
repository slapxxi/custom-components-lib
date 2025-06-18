export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// eslint-disable-next-line
export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
