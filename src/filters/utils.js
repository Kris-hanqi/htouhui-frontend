export function isNumber(value) {
  return typeof value === 'number';
}

export function isString(value) {
  return typeof value === 'string';
}

/**
 * 格式化 number 为 string
 * @param {number} number    // 需要格式化的数字
 * @param {{
 *           minFrac, // 数字小数部分的最小位数
 *           maxFrac, // 数字小数部分的最大位数
 *           gSize,   // 每组数字中的数字位数
 *           lgSzie,  // 小数点分隔符前的最后一组数字中的位数
 *           negPre,  // 在负数前面的字符串
 *           posPre,  // 在正数前面的字符串
 *           negSuf,  // 在负数之后的字符串
 *           posSuf   // 在正数之后的字符串
 *        }} pattern
 * @param {string}  groupSep    // 用来分隔数字组的字符串
 * @param {string} decimalSep   // 用来小数点分隔的字符串
 * @param {[type]} fractionSize // 数字的小数部分的大小
 * @return {string}
 */
export function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
  // 类型检查
  if (!(isString(number) || isNumber(number)) || isNaN(number)) return '';

  const isInfinity = !isFinite(number);
  let isZero = false;
  let numStr = Math.abs(number) + '';
}
