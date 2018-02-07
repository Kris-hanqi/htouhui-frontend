/**
 * 判断参数是否是其中之一
 * @param value
 * @param validList
 * @returns {boolean}
 */
export function oneOf(value, validList) {
  for (let i = 0, len = validList.length; i < len; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 *
 * @param context
 * @param componentName
 * @param componentNames
 * @returns {boolean}
 */
export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;

    if (parent) {
      name = parent.$options.name;
    }
  }

  return parent;
}

/**
 *
 * @param context
 * @param componentName
 * @returns {*}
 */
export function findComponentsUpward(context, componentName) {
  let parents = [];
  if (context.$parent) {
    if (context.$parent.$options.name === componentName) {
      parents.push(context.$parent);
      return parents.concat(findComponentsUpward(context.$parent, componentName));
    } else {
      return [];
    }
  }
}

/**
 *
 * @param context
 * @param componentName
 * @returns {*}
 */
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

/**
 *
 * @param context
 * @param componentName
 * @returns {*}
 */
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    const foundChilds = findComponentDownward(child, componentName);
    return components.concat(foundChilds);
  }, [])
}

/**
 *
 * @param context
 * @param componentName
 */
export function findBrothersComponents(context, componentName) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.indexOf(context);
  res.splice(index, 1);
  return res;
}

/* istanbul ignore next */
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}
