/**
 * 判断参数是否是其中之一
 * @param value
 * @param validList
 * @returns {boolean}
 */
export function oneOf(value, validList) {
  for (let i = 0, len = validList.length; i < len; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}
