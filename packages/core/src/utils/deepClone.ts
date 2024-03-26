export function deepClone<T>(obj: T): T {
  // Check if the object is a primitive value, if so return it directly
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Check if the object is an array, if so create a new array and recursively deep clone each element
  if (Array.isArray(obj)) {
    const newArr = [];
    for (let i = 0; i < obj.length; i++) {
      newArr[i] = deepClone(obj[i]);
    }
    return newArr as unknown as T;
  }

  // If the object is not an array, create a new object and recursively deep clone each property
  const newObj = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
}
