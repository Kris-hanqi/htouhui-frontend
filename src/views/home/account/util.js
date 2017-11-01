const mapData = {
  planNovice: {
    order: 1,
    label: '新手计划',
    color: '#f8e71c',
    addressUrl: ''
  },
  plan21Day: {
    order: 2,
    label: '21天计划',
    color: '#ffa837',
    addressUrl: ''
  },
  SxbQuantify: {
    order: 3,
    label: '升薪宝量化',
    color: '#b8e986',
    addressUrl: ''
  },
  SxbRegular: {
    order: 4,
    label: '升薪宝定期',
    color: '#50e3c2',
    addressUrl: ''
  },
  regularMortgage: {
    order: 5,
    label: '定期抵押',
    color: '#06b7f0',
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
