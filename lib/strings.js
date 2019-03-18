

exports.asList = (arr) => {
  if (arr.length === 1) return arr[0];
  const concatenator = 'y';
  return `${arr.slice(0, arr.length - 1).join(', ')} ${concatenator} ${arr[arr.length - 1]}`;
};