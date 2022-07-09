import { assert, isComplexArray } from "../deps.ts";

Deno.test("isComplexArray - Detects a complex array is a complex array", () => {
    // Assign
    const fieldName = "user[0]";

    // Act
    const forComplexObjects = isComplexArray(fieldName);

    // Assert
    assert(forComplexObjects);
});

Deno.test("isComplexArray - Detects a primitive array is not a complex array", () => {
    // Assign
    const fieldName = "tags[]";

    // Act
    const forComplexObjects = isComplexArray(fieldName);

    // Assert
    assert(!forComplexObjects);
});

Deno.test("isComplexArray - Detects a normal property is not a complex array", () => {
    // Assign
    const fieldName = "name";

    // Act
    const forComplexObjects = isComplexArray(fieldName);

    // Assert
    assert(!forComplexObjects);
});
