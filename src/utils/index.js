import moment from 'moment';
const mArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

export function getMonths(str) {
  let result = mArr.indexOf(str) + 1 + '';

  if (result.length === 1) {
    result = '0' + result;
  }

  return result;
}

/**
 * 转换日期字符串格式
 * @param str 十一月 7, 2017
 */
export function dateStrFormat(str) {
  const arr = str.split(' ');
  const newArr = [];
  newArr[0] = arr[2];
  newArr[1] = getMonths(arr[0]);
  newArr[2] = arr[1].slice(0, arr[1].length - 1);

  if (newArr[2].length === 1) {
    newArr[2] = '0' + newArr[2];
  }

  return newArr.join('-');
}

/**
 * 通过字符串获取开始/结束时间
 * @param str 3day 1month 3month
 */
export function getStartAndEndTime(str) {
  const dates = {
    startTime: null,
    endTime: null
  };
  const now = moment(new Date());
  dates.endTime = now.format('YYYY-MM-DD HH:mm:ss');
  // 三天
  if (str === '3day') {
    dates.startTime = now.subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
  }
  // 一月
  if (str === '1month') {
    dates.startTime = now.subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss');
  }
  // 三月
  if (str === '3month') {
    dates.startTime = now.subtract(3, 'month').format('YYYY-MM-DD HH:mm:ss');
  }
  return dates;
}

export function getDateString(date, format) {
  format = format || 'YYYY-MM-DD HH:mm:ss';
  if (date) {
    return moment(date).format(format);
  }
}

export function formatDate(date, format) {
  date = date || new Date();
  format = format || 'YYYY-MM-DD HH:mm:ss';
  if (date) {
    return moment(date).format(format);
  }
}

/**
 * 获取请求参数
 * @param url
 * @returns {{}}
 */
export function param2Obj(url) {
  const search = url.split('?')[1];

  if (!search) {
    return {};
  }

  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/** 获取get请求查询参数 */
export function parseQuery(query) {
  const res = {};

  query = query.substring(query.lastIndexOf('?') + 1);
  query = query.trim().replace(/^(\?|#|&)/, '');

  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=');
    const key = decodeURIComponent(parts.shift());
    const val = parts.length > 0
      ? decodeURIComponent(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

export function getLocationUrl() {
  return window.location.protocol + '//' + window.location.host;
}
