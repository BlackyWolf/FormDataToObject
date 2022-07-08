// deno-lint-ignore-file no-explicit-any

import { getArrayPropertyName } from "./getArrayPropertyName.ts";
import { getComplexArrayIndex } from "./getComplexArrayIndex.ts";
import { isComplexArray } from "./isComplexArray.ts";
import { isPrimitiveArray } from "./isPrimitiveArray.ts";

/**
  * Builds the properties on the passed model object based on the list of names
  * and value. The method may attempt to recursively build properties of
  * complex types.
  *
  * @param model - The model to build the properties for.
  * @param names - The field name, split into an array at the period.
  * @param value - The value to assign to the constructed property.
  */
export function buildProperty(model: any, names: string[], value: unknown) {
    const firstPropertyName = names[0];

    if (isPrimitiveArray(firstPropertyName)) {
        const arrayPropertyName = getArrayPropertyName(firstPropertyName);

        // If the array exists, push the value.
        if (Array.isArray(model[arrayPropertyName])) {
            model[arrayPropertyName].push(value);
        }
        // Else, create the new array on the property with the passed value.
        else {
            model[arrayPropertyName] = [value]
        }

        return;
    }

    if (isComplexArray(firstPropertyName)) {
        const arrayPropertyName = getArrayPropertyName(firstPropertyName);
        const indexNumber = getComplexArrayIndex(firstPropertyName);

        // If the array does not yet exist on the property, assign an empty
        // array
        if (!Array.isArray(model[arrayPropertyName])) {
            model[arrayPropertyName] = [];
        }

        // If the object being assigned values to does not yet exist in the
        // array, push an empty object to assign values to.
        if (model[arrayPropertyName].length === indexNumber) {
            model[arrayPropertyName].push({});
        }

        // Recursively build the complex object using the same method and only
        // passing in the necessary names and value.
        buildProperty(model[arrayPropertyName][indexNumber], names.slice(1), value);

        return;
    }

    // If the property is a primitive type, assign the value and return.
    if (names.length === 1) {
        model[firstPropertyName] = value;

        return;
    }

    // If the object has not yet been created for the property, assign an empty
    // object to assign values to.
    if (!model[firstPropertyName]) model[firstPropertyName] = {};

    // Recursively build the complex object using the same method and only
    // passing in the necessary names and value.
    buildProperty(model[firstPropertyName], names.slice(1), value);
}
