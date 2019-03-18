exports.baseChars = str => str.toLowerCase().replace(/[áäàÀÁÂÃÄÅ]/g, 'a')
  .replace(/[èéèÈÉÊË]/g, 'e')
  .replace(/[íìIÎ]/g, 'i')
  .replace(/[óòÓÔ]/g, 'o')
  .replace(/[úùüÙ]/g, 'u')
  .replace(/[çÇ]/g, 'c')
  .replace(/[ñÑ]/g, 'n')
  .replace(/[-\\?]/g, '');

exports.listString = (arr) => {
  if (arr.length === 1) return arr[0];
  const concatenator = 'y';
  return `${arr.slice(0, arr.length - 1).join(', ')} ${concatenator} ${arr[arr.length - 1]}`;
};