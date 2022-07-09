import { buildProperty, convertValue } from "./utilities/mod.ts";

/**
 * Converts the `FormData` to an object. The generic type is for convenience
 * when using the returned value.
 *
 * @typeParam TModel - The type of model being built and returned.
 *
 * @param formData - The form field data used to build the object.
 *
 * @returns The newly constructed object model.
 */
export function formDataToObject<TModel>(formData: FormData): TModel {
    const model: unknown = {};

    formData.forEach((value, key) => {
        const names = key.split(".");

        const actualValue = convertValue(value.valueOf());

        buildProperty(model, names, actualValue);
    });

    return model as TModel;
}
