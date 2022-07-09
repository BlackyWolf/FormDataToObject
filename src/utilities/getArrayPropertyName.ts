import { InvalidArrayFieldNameError } from "../errors/mod.ts";

/**
  * Gets the property name of the array for the model.
  *
  * @param name - The name of the property on the model object.
  *
  * @throws {@link InvalidArrayFieldNameError}
  *
  * @returns The field name minus the braces and index number, if present.
  */
export function getArrayPropertyName(name: string) {
    const arrayFirstBraceIndex = name.indexOf("[");

    if (arrayFirstBraceIndex < 1) {
        throw new InvalidArrayFieldNameError(name);
    }

    return name.substring(0, arrayFirstBraceIndex);
}
