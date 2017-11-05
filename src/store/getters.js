const getters = {
  token: state => state.user.token,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  username: state => state.user.username,
  realName: state => state.user.realName,
  status: state => state.user.status,
  transactionPasswordStatus: state => state.user.transactionPasswordStatus,
  bankCard: state => state.user.bankCard,
  bankName: state => state.user.bankName,
  accountId: state => state.user.accountId,
  showNovicePlan: state => state.user.showNovicePlan,
  showNovicePlanMessage: state => state.user.showNovicePlanMessage,
  isBorrower: state => state.user.isBorrower
};

export default getters;
