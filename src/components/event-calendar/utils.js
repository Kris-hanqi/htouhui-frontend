export const configData = {
  weekNames: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};

export function isEqualDateStr(dateStr1, dateStr2) {
  const dateArr1 = dateStr1.split('-');
  const dateArr2 = dateStr2.split('-');
  if (parseInt(dateArr1[0], 10) !== parseInt(dateArr2[0], 10)) {
    return false
  }
  if (parseInt(dateArr1[1], 10) !== parseInt(dateArr2[1], 10)) {
    return false
  }
  if (parseInt(dateArr1[2], 10) !== parseInt(dateArr2[2], 10)) {
    return false
  }
  return true;
}
