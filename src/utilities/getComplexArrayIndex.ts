/**
  * Gets the index number for mapping sub-properties of a complex array.
  *
  * @param name - The name of the property on the model object.
  *
  * @returns The index number of the object in the array.
  */
export function getComplexArrayIndex(name: string) {
    const arrayFirstBraceIndex = name.indexOf("[");

    return +name[arrayFirstBraceIndex + 1];
}