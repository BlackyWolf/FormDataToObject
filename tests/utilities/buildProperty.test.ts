// deno-lint-ignore-file no-explicit-any
import { assert, assertEquals, assertExists, buildProperty } from "../deps.ts";

Deno.test("buildProperty - Adds primitive value to object property", () => {
    // Assign
    const model: any = {};
    const names = ["firstName"];
    const value = "Tod";

    // Act
    buildProperty(model, names, value);

    // Assert
    assertExists(model);
    assertEquals(model['firstName'], value);
});
