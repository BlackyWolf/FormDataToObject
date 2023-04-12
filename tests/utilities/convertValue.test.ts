import { assert, convertValue } from "../deps.ts";

Deno.test("convertValue - Number string converts to number", () => {
    // Assign
    const value = "6";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(!isNaN(+actualValue));
});

Deno.test("convertValue - Empty string converts to empty string", () => {
    // Assign
    const value = "";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(actualValue === "");
});

Deno.test("convertValue - Fractal string does not convert to number", () => {
    // Assign
    const value = "1/5";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(isNaN(+actualValue));
});

Deno.test("convertValue - True string converts to true boolean", () => {
    // Assign
    const value = "true";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(actualValue === true);
});

Deno.test("convertValue - False string converts to false boolean", () => {
    // Assign
    const value = "false";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(actualValue === false);
});

Deno.test("convertValue - Zero value string does not convert to boolean", () => {
    // Assign
    const value = "0";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(actualValue !== false);
    assert(actualValue !== true);
});

Deno.test("convertValue - One value string does not convert to boolean", () => {
    // Assign
    const value = "1";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(actualValue !== false);
    assert(actualValue !== true);
});

Deno.test("convertValue - String converts to string", () => {
    // Assign
    const value = "Yo";

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(typeof actualValue === "string");
});

Deno.test("convertValue - Object does not convert to number, boolean, or string", () => {
    // Assign
    const value = { name: "Bob" };

    // Act
    const actualValue = convertValue(value);

    // Assert
    assert(typeof actualValue !== "string");
    assert(typeof actualValue !== "number");
    assert(typeof actualValue !== "boolean");
    assert(typeof actualValue === "object");
});
