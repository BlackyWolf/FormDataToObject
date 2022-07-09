import { assertEquals, assertThrows, getComplexArrayIndex, InvalidArrayFieldNameError } from "../deps.ts";

Deno.test("getComplexArrayIndex - Gets index number from field name for complex arrays", () => {
    // Assign
    const fieldName = "users[1701]";

    // Act
    const indexNumber = getComplexArrayIndex(fieldName);

    // Assert
    assertEquals(indexNumber, 1701);
});

Deno.test("getComplexArrayIndex - Throws error on invalid field name for object property", () => {
    // Assign
    const fieldName = "name";

    // Act/Assert
    assertThrows(() => getComplexArrayIndex(fieldName), InvalidArrayFieldNameError, fieldName);
});

Deno.test("getComplexArrayIndex - Throws error on invalid field name for primitive array field name", () => {
    // Assign
    const fieldName = "tags[]";

    // Act/Assert
    assertThrows(() => getComplexArrayIndex(fieldName), InvalidArrayFieldNameError, fieldName);
});

Deno.test("getComplexArrayIndex - Throws error on invalid field name for complex array field name", () => {
    // Assign
    const fieldName = "[1200]";

    // Act/Assert
    assertThrows(() => getComplexArrayIndex(fieldName), InvalidArrayFieldNameError, fieldName);
});
