/**
 * 货币过滤器
 * @param {String} 货币单位
 * @param {Number} 小数点后保留几位
 */
export default function currency(value, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g;
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return '';
  // 设置参数默认值
  currency = currency === null ? '$' : currency;
  decimals = decimals === null ? 2 : decimals;
  const stringified = Math.abs(value).toFixed(decimals);
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  const i = _int.length % 3;
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
  const _float = decimals ? stringified.slice(-1 - decimals) : '';
  const sign = value < 0 ? '-' : '';
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
}
