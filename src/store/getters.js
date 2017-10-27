const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  status: state => state.user.status,
  bankCard: state => state.user.bankCard,
  showNovicePlan: state => state.user.showNovicePlan
};

export default getters;
