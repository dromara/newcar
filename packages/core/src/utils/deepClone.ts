export function deepClone(obj: Object, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 处理循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  let cloned: any[] | Record<string, any>;
  if (Array.isArray(obj)) {
    cloned = [];
    map.set(obj, cloned);
    for (let i = 0; i < obj.length; i++) {
      cloned.push(deepClone(obj[i], map));
    }
  } else {
    cloned = {};
    map.set(obj, cloned);
    for (let key in obj) {
      cloned[key] = deepClone((obj as Record<string, any>)[key], map);
    }
  }

  return cloned;
}