/**
  * Gets the property name of the array for the model.
  *
  * @param name - The name of the property on the model object.
  *
  * @returns The field name minus the braces and index number, if present.
  */
export function getArrayPropertyName(name: string) {
    const arrayFirstBraceIndex = name.indexOf("[");

    return name.substring(0, arrayFirstBraceIndex);
}
