import fetch from 'utils/fetch';

/** 风险评估-得到问卷 */
export function fetchGetQuestionnaire() {
  return fetch({
    url: 'questionnaire/riskassessment',
    method: 'get'
  })
}

/** 风险评估-得到问卷 */
export function fetchSubmitQuestionnaire(data) {
  return fetch({
    url: 'questionnaire/riskassessmentout',
    method: 'post',
    data
  })
}

/** 绑定银行卡 */
export function fetchUnlockBankCard() {
  return fetch({
    url: 'user/unbinding',
    method: 'get'
  })
}

/** 银行卡解除绑定 */
export function fetchBindBankCard(code) {
  return fetch({
    url: 'user/bindingCard',
    method: 'get',
    params: { cardNo: code }
  })
}

/** 绑定||换绑邮箱 */
export function fetchBindEmail(data) {
  return fetch({
    url: 'user/bindEmail',
    method: 'post',
    data
  })
}

/** 校验原邮箱 */
export function fetchCheckCurrentEmail(data) {
  return fetch({
    url: 'user/checkCurrentEmail',
    method: 'get',
    params: data
  })
}

/** 检验手机验证码 */
export function fetchCheckCurrentMobile(data) {
  return fetch({
    url: 'user/checkCurrentMobile',
    method: 'get',
    params: data
  })
}

/** 修改手机号 */
export function fetchUpdateBindMobile(data) {
  return fetch({
    url: 'user/changeBindingMobileNumber',
    method: 'get',
    params: data
  })
}

/** 用户开户 */
export function fetchOpenAccount(data) {
  return fetch({
    url: 'user/openAccount',
    method: 'post',
    data
  })
}

/** 获取设置交易密码请求数据 */
export function fetchSetTransactionPassword(data) {
  return fetch({
    url: 'user/setPwd',
    method: 'get',
    params: data
  })
}

/** 获取重置交易密码请求数据 */
export function fetchResetTransactionPassword(data) {
  return fetch({
    url: 'user/passwordReset',
    method: 'get',
    params: data
  })
}

/** 自动投标签约 */
export function fetchAutomaticBidding(data) {
  return fetch({
    url: 'user/autoBidAuth',
    method: 'post',
    data
  })
}

/** 自动债转签约 */
export function fetchAutomaticDebtTransfer(data) {
  return fetch({
    url: 'user/autoCreditInvestAuth',
    method: 'post',
    data
  })
}

/** 自动还款签约 */
export function fetchAutomaticRepayment() {
  return fetch({
    url: 'user/authorizeAutoRepay',
    method: 'get'
  })
}




