const mArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

export function getMonths(str) {
  let result = mArr.indexOf(str) + 1 + '';

  if (result.length === 1) {
    result = '0' + result;
  }

  return result;
}

/**
 * 转换日期字符串格式
 * @param str 十一月 7, 2017
 */
export function dateStrFormat(str) {
  const arr = str.split(' ');
  const newArr = [];
  newArr[0] = arr[2];
  newArr[1] = getMonths(arr[0]);
  newArr[2] = arr[1].slice(0, arr[1].length - 1);

  if (newArr[2].length === 1) {
    newArr[2] = '0' + newArr[2];
  }

  return newArr.join('-');
}
