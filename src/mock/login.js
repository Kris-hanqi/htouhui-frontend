import uniqueString from '../utils/uniqueString';

const user = {
  realName: '张三',
  idCard: '142701199403234345',
  mobileNumber: '17710000245',
  bankCard: '66666666666666666666',
  bankName: '中国工商银行',
  accountId: '454545342323',
  isOpenAccount: true,
  isSetPassWord: true,
  isAutoBidAuth: true,
  isAutoInvestAuth: true,
  isAutoRepayAuth: true,
  email: '156178999@qq.com',
  isNovice: true,
  isJoinNovicePlan: true,
  isHaveTransfer: true,
  status: 'without_account',
  roles: []
};

export default {
  login: config => {
    const data = JSON.parse(config.body);
    console.log(data);
    return {
      data: {
        token: uniqueString()
      },
      meta: {
        code: 200,
        message: 'OK'
      }
    }
  },
  userInfo: () => ({
    data: user,
    meta: {
      code: 200,
      message: 'OK'
    }
  })
}

