import { assert, isPrimitiveArray } from "../deps.ts";

Deno.test("isPrimitiveArray - Detects a primitive array is a primitive array", () => {
    // Assign
    const fieldName = "tags[]";

    // Act
    const forPrimitiveValues = isPrimitiveArray(fieldName);

    // Assert
    assert(forPrimitiveValues);
});

Deno.test("isPrimitiveArray - Detects a complex array is not a primitive array", () => {
    // Assign
    const fieldName = "user[0]";

    // Act
    const forPrimitiveValues = isPrimitiveArray(fieldName);

    // Assert
    assert(!forPrimitiveValues);
});

Deno.test("isPrimitiveArray - Detects a normal property is not a primitive array", () => {
    // Assign
    const fieldName = "name";

    // Act
    const forPrimitiveValues = isPrimitiveArray(fieldName);

    // Assert
    assert(!forPrimitiveValues);
});
