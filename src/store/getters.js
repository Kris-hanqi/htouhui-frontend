const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  status: state => state.user.status,
  bankCard: state => state.user.bankCard,
  showNovicePlan: state => state.user.showNovicePlan,
  isBorrower: state => state.user.isBorrower
};

export default getters;
