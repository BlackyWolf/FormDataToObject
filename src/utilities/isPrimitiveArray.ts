/**
 * Checks if the array value being assigned to the property is for simple value
 * types, e.g. `String`, `Number`, `Boolean`, etc. or for complex types like
 * `Object`.
 *
 * @param name - The name of the property on the model object.
 *
 * @returns `True` if the property is a primitive array, otherwise `false`.
 */
export const isPrimitiveArray = (name: string) => name.indexOf("[]") > 0;