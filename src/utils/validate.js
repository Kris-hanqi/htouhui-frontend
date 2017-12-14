/** 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str)
}

/** 小写字母*/
export function validateNumber(str) {
  const reg = /^[0-9]+$/;
  return reg.test(str)
}

/** 中文 */
export function validateChinese(str) {
  const reg = /^[\u4e00-\u9fa5]+$/;
  return reg.test(str)
}

/** 金额校验 */
export function validateMoney(str) {
  const reg = /(^[1-9]([0-9]+)?$)/;
  return reg.test(str)
}

/** 邮箱校验 */
export function validateEmail(str) {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(str)
}

/** 手机号校验 */
export function validateMobile(str) {
  const reg = /^1[34578]\d{9}$/;
  return reg.test(str)
}

/** 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str)
}

/** 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str)
}

/** 18位身份证号码 */
export function validateIdCard(str) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(str)
}

/** 密码校验 6-18 字母与数字组合 */
export function validatePassword(str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  return reg.test(str)
}

