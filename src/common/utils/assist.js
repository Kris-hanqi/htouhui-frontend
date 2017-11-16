/**
 * 判断参数是否合法
 * @param value
 * @param validList
 * @returns {boolean}
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}
