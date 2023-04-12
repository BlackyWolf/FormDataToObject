// deno-lint-ignore-file no-explicit-any

/**
  * Converts the passed value to a primitive value of `Number`, `Boolean`, or
  * `String`.
  *
  * @param value - The value to convert.
  *
  * @returns The value as either a number, boolean, or the passed value.
  */
export function convertValue(value: any): number | boolean | string {
    if (value === "true") return true;

    if (value === "false") return false;

    if (value === "") return "";

    if (!isNaN(+value)) return +value;

    return value;
}
