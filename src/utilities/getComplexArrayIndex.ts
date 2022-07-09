import { InvalidArrayFieldNameError } from "../errors/mod.ts";

/**
  * Gets the index number for mapping sub-properties of a complex array.
  *
  * @param name - The name of the property on the model object.
  *
  * @returns The index number of the object in the array.
  */
export function getComplexArrayIndex(name: string) {
    const firstBraceIndex = name.indexOf("[");
    const lastBraceIndex = name.indexOf("]");

    // There isn't at least one letter for the property name before the first brace,
    // or, if there isn't an index number between the first and last brace
    if (firstBraceIndex < 1 || lastBraceIndex - firstBraceIndex < 2) {
        throw new InvalidArrayFieldNameError(name);
    }

    return +name.slice(firstBraceIndex + 1, lastBraceIndex);
}
