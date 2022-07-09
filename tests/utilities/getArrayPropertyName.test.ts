import { assertEquals, assertThrows, getArrayPropertyName, InvalidArrayFieldNameError } from "../deps.ts";

Deno.test("getArrayPropertyName - Gets the object property name from the field name for complex arrays", () => {
    // Assign
    const fieldName = "users[3]";

    // Act
    const propertyName = getArrayPropertyName(fieldName);

    // Assert
    assertEquals(propertyName, "users");
});

Deno.test("getArrayPropertyName - Gets the object property name from the field name for primitive arrays", () => {
    // Assign
    const fieldName = "tags[]";

    // Act
    const propertyName = getArrayPropertyName(fieldName);

    // Assert
    assertEquals(propertyName, "tags");
});

Deno.test("getArrayPropertyName - Throws error on invalid field name for object property", () => {
    // Assign
    const fieldName = "name";

    // Act/Assert
    assertThrows(() => getArrayPropertyName(fieldName), InvalidArrayFieldNameError, fieldName);
});

Deno.test("getArrayPropertyName - Throws error on invalid field name for complex array", () => {
    // Assign
    const fieldName = "[10]";

    // Act/Assert
    assertThrows(() => getArrayPropertyName(fieldName), InvalidArrayFieldNameError, fieldName);
});
