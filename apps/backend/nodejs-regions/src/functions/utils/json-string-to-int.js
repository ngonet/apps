export function jsonStringToInt({ id }) {
  const objects = [{ id }];
  const obj = objects[0];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
      obj[prop] = +obj[prop];
    }
  }
  var { id } = objects[0];
  return { id };
}
