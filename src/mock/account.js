const investStatisticsData = {
  balance: 54211,
  sumCapital: 54211,
  accumulatedIncome: 232233121,
  frozenMoney: 121212
};

export default {
  investStatistics: () => ({
    data: investStatisticsData,
    meta: {
      code: 200,
      message: 'OK'
    }
  })
}

