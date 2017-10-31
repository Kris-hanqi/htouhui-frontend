const assetStatisticsData = {
  balance: 54211,
  sumCapital: 54211,
  accumulatedIncome: 232233121,
  frozenMoney: 121212
};

const investStatisticsData = {
  xsMap: { // 新手投资总额
    sum: 1000.0,
    interest: 4.2
  },
  kzMap: { // 21天总投资额
    sum: 2000,
    interest: 20
  },
  lhMap: { // 量化
    sum: 2000,
    interest: 10
  },
  sxbMap: { // 升薪宝
    sum: 2000,
    interest: 10
  },
  dqMap: { // 定期
    sum: 2000,
    interest: 10
  }
};

export default {
  assetStatistics: () => ({
    data: assetStatisticsData,
    meta: {
      code: 200,
      message: 'OK'
    }
  }),
  investStatistics: () => ({
    data: investStatisticsData,
    meta: {
      code: 200,
      message: 'OK'
    }
  })
}

