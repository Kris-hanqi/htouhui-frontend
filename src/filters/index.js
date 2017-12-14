/**
 * 获取key对应的value值
 * @param key
 * @param list
 * @returns {string}
 */
export function keyToValue(key, list) {
  let value = null;

  list.forEach(item => {
    if (item.key === key) {
      value = item.value;
    }
  });

  if (value === null) {
    value = 'ERROR';
  }

  return value;
}
