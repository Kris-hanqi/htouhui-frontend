
// 回到顶部动画
export function scrollTop(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }

  // 获取绝对值
  const difference = Math.abs(from - to);
  // 获取一个整数
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) return;

    let d = (start + step) > end ? end : start + step;

    if (start > end) {
      d = (start - step) < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTo = d;
    }

    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}
