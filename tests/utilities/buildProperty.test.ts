// deno-lint-ignore-file no-explicit-any
import { assertArrayIncludes, assertEquals, assertExists, buildProperty } from "../deps.ts";

Deno.test("buildProperty - Adds primitive value to model property", () => {
    // Assign
    const model: any = {};
    const names = ["firstName"];
    const value = "Tod";

    // Act
    buildProperty(model, names, value);

    // Assert
    assertExists(model);
    assertEquals(model["firstName"], value);
});

Deno.test("buildProperty - Adds nested object to model property", () => {
    // Assign
    const model: any = {};
    const names = ["user", "settings", "multiFactorEnabled"];
    const value = true;

    // Act
    buildProperty(model, names, value);

    // Assert
    assertExists(model);
    assertExists(model["user"]);
    assertExists(model["user"]["settings"]);
    assertExists(model["user"]["settings"]["multiFactorEnabled"]);
    assertEquals(model["user"]["settings"]["multiFactorEnabled"], value);
});

Deno.test("buildProperty - Adds value to primitive array on model property", () => {
    // Assign
    const model: any = {};
    const names = ["tags[]"];
    const value = "chicken";

    // Act
    buildProperty(model, names, value);

    // Assert
    assertExists(model);
    assertExists(model["tags"]);
    assertArrayIncludes(model["tags"], [value]);
});

Deno.test("buildProperty - Adds multiple values to primitive array on model property", () => {
    // Assign
    const model: any = {};
    const names = ["tags[]"];
    const value1 = "chicken";
    const value2 = "nugget";
    const value3 = "sandwich";

    // Act
    buildProperty(model, names, value1);
    buildProperty(model, names, value2);
    buildProperty(model, names, value3);

    // Assert
    assertExists(model);
    assertExists(model["tags"]);
    assertArrayIncludes(model["tags"], [value1, value2, value3]);
});

Deno.test("buildProperty - Adds object to complex array on model property", () => {
    // Assign
    const model: any = {};
    const names = ["users[0]", "name"];
    const value = "Double D";

    // Act
    buildProperty(model, names, value);

    // Assert
    assertExists(model);
    assertExists(model["users"]);
    assertExists(model["users"][0])
    assertEquals(model["users"][0]["name"], value);
});

Deno.test("buildProperty - Adds multiple objects to complex array on model property", () => {
    // Assign
    const model: any = {};
    const names1 = ["users[0]", "name"];
    const names2 = ["users[1]", "name"];
    const names3 = ["users[2]", "name"];
    const value1 = "Double D";
    const value2 = "Ed";
    const value3 = "Eddie";

    // Act
    buildProperty(model, names1, value1);
    buildProperty(model, names2, value2);
    buildProperty(model, names3, value3);

    // Assert
    assertExists(model);
    assertExists(model["users"]);
    assertExists(model["users"][0])
    assertExists(model["users"][1])
    assertExists(model["users"][2])
    assertEquals(model["users"][0]["name"], value1);
    assertEquals(model["users"][1]["name"], value2);
    assertEquals(model["users"][2]["name"], value3);
});
