/**
 * The function checks if an array is empty or not and returns a boolean value.
 * @param {String[] | any} array - The parameter "array" is of type "StringMap[] | any", which means
 * it can either be an array of objects with string keys and any values, or any other type of data.
 * @returns a boolean value. It returns `true` if the input array is not empty (i.e., it is an array
 * and has at least one element), and `false` otherwise.
 */
export function checkArray(array: String[] | any) {
  if (Array.isArray(array) && array?.length > 0) {
    if (array.length === 1 && array[0] === undefined) {
      return false;
    } else {
      return true;
    }
  }
  // Ngược lại, trả về false
  return false;
}
