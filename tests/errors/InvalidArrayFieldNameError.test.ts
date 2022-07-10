import { assertEquals, assertStringIncludes, InvalidArrayFieldNameError } from "../deps.ts";

Deno.test("InvalidArrayFieldNameError - Contains invalid field name in error property", () => {
    // Assign
    const fieldName = "tags[";

    // Act
    const error = new InvalidArrayFieldNameError(fieldName);

    // Assert
    assertEquals(error.invalidFieldName, fieldName);
});

Deno.test("InvalidArrayFieldNameError - Contains invalid field name in error message", () => {
    // Assign
    const fieldName = "tags[";

    // Act
    const error = new InvalidArrayFieldNameError(fieldName);

    // Assert
    assertStringIncludes(error.message, fieldName);
});
