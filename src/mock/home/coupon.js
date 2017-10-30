import Mock from 'mockjs';
import { param2Obj } from '@/utils'

const List = [];
const count = 20;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    'type|1': ['cash', 'plus_coupon', 'lijin'],
    getTime: '@datetime',
    endTime: '@datetime',
    lowerLimitMoney: '@natural(10, 100)',
    higherLimitMoney: '@natural(100, 1000)',
    'status|1': ['unused', 'used', 'expire'],
    maxInterestMoney: '@natural(10, 100)',
    interestDeadline: '@natural(10, 30)',
    'rate|1': [1.2, 1.5, 2],
    money: '@natural(1000, 3000)'
  }));
}

export default {
  getPageList: config => {
    const { pageNo = 1, pageSize = 6 } = param2Obj(config.url);

    const pageList = List.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1));

    return {
      data: {
        total: List.length, // 总条数
        data: pageList
      },
      meta: {
        code: 200,
        message: 'OK'
      }
    }
  }
}
