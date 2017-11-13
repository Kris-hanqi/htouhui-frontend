const mapData = {
  planNovice: {
    order: 1,
    label: '新手计划',
    color: '#f8e71c',
    addressUrl: ''
  },
  SxbScroll21: {
    order: 2,
    label: '升薪宝滚动21',
    color: '#ffa837',
    addressUrl: ''
  },
  plan21Day: {
    order: 3,
    label: '21天计划',
    color: '#b8e986',
    addressUrl: ''
  },
  SxbQuantify: {
    order: 4,
    label: '升薪宝量化',
    color: '#50e3c2',
    addressUrl: ''
  },
  SxbRegular: {
    order: 5,
    label: '升薪宝定期',
    color: '#06b7f0',
    addressUrl: ''
  },
  regularMortgage: {
    order: 6,
    label: '定期抵押',
    color: '#0671f0',
    addressUrl: ''
  }
};

export function getInvestData(data) {
  const list = [];
  for (const key in data) {
    const value = data[key]; // eslint-disable-line

    const item = {};

    if (key === 'noviceMap') {
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

    list.push(item);
  }

  return list;
}
