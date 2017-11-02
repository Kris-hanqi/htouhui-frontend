const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  status: state => state.user.status,
  bankCard: state => state.user.bankCard,
  accountId: state => state.user.accountId,
  showNovicePlan: state => state.user.showNovicePlan,
  showNovicePlanMessage: state => state.user.showNovicePlan,
  isBorrower: state => state.user.isBorrower
};

export default getters;
