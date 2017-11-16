const getters = {
  token: state => state.user.token,
  uuid: state => state.user.uuid,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  lastLoginTime: state => state.user.lastLoginTime,
  username: state => state.user.username,
  realName: state => state.user.realName,
  status: state => state.user.status,
  transactionPasswordStatus: state => state.user.transactionPasswordStatus,
  bankCard: state => state.user.bankCard,
  bankName: state => state.user.bankName,
  bankNo: state => state.user.bankNo,
  accountId: state => state.user.accountId,
  IDNumber: state => state.user.IDNumber,
  novicePlanStatus: state => state.user.novicePlanStatus,
  isAutomaticBidding: state => state.user.isAutomaticBidding,
  isAutomaticDebtTransfer: state => state.user.isAutomaticDebtTransfer,
  isAutomaticRepayment: state => state.user.isAutomaticRepayment,
  isBorrower: state => state.user.isBorrower
};

export default getters;
