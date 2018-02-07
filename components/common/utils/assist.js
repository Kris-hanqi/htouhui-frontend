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

      }
    }
  }

  return children;
}

export function findComponentsDownward() {

}


