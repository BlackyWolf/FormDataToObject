/**
 * Checks if the array value being assigned to the property is for complex
 * types like `Object`, or for simple value types, e.g. `String`, `Number`,
 * `Boolean`, etc.
 *
 * @param name - The name of the property on the model object.
 *
 * @returns `True` if the property is a complex array, otherwise `false`.
 */
export function isComplexArray(name: string) {
    const lastIndex = name.length - 1;
    const firstBraceIndex = name.indexOf("[");

    // Checks if there's actually a property name present. Must be at least one
    // character in length.
    if (firstBraceIndex < 1) return false;

    // Checks if the first brace is the last character of the field name.
    if (firstBraceIndex === lastIndex) return false;

    // Checks if there are exactly two additional character indices after the
    // first brace index.
    if (lastIndex - firstBraceIndex !== 2) return false;

    const indexNumber = name[firstBraceIndex + 1];

    // Ensures the index number in the field name is actually a number.
    if (isNaN(+indexNumber)) return false;

    const lastBraceIndex = name.indexOf("]");

    // Checks if the last brace index is actually the last character.
    if (lastBraceIndex !== lastIndex) return false;

    return true;
}