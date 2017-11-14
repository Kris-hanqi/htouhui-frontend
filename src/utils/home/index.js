import store from '@/store';

const mapData = {
  planNovice: {
    order: 1,
    label: '新手计划',
    color: '#f8e71c',
    url: '/plan'
  },
  SxbScroll21: {
    order: 2,
    label: '升薪宝滚动21',
    color: '#ffa837',
    url: '/plan'
  },
  plan21Day: {
    order: 3,
    label: '21天计划',
    color: '#b8e986',
    url: '/plan'
  },
  SxbQuantify: {
    order: 4,
    label: '升薪宝量化',
    color: '#50e3c2',
    url: '/plans'
  },
  SxbRegular: {
    order: 5,
    label: '升薪宝定期',
    color: '#06b7f0',
    url: '/shengxinbaos'
  },
  regularMortgage: {
    order: 6,
    label: '定期抵押',
    color: '#0671f0',
    url: '/normalLoans'
  }
};

export function getInvestData(data) {
  const list = [];
  for (const key in data) {
    const value = data[key]; // eslint-disable-line

    const item = {};

    if (key === 'noviceMap' && store.getters.showNovicePlan) {
      Object.assign(item, mapData.planNovice, value);
    }

    if (key === 'skyMap') {
      Object.assign(item, mapData.plan21Day, value);
    }

    if (key === 'quantificationMap') {
      Object.assign(item, mapData.SxbQuantify, value);
    }

    if (key === 'shengxinbaoMap') {
      Object.assign(item, mapData.SxbRegular, value);
    }

    if (key === 'regularMap') {
      Object.assign(item, mapData.regularMortgage, value);
    }

    if (key === 'rollPlanMap') {
      Object.assign(item, mapData.SxbScroll21, value);
    }

    // 添加计划ID
    if (item.planId) {
      item.url = item.url + '/' + item.planId;
    }

    item.sum = item.sum || 0;
    item.interest = item.interest || 0;

    if (item.order) {
      list.push(item);
    }
  }

  list.sort((a, b) => a.order - b.order);

  return list;
}
