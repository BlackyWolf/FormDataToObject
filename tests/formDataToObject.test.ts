import { assertObjectMatch, formDataToObject } from "./deps.ts";

interface Measurement {
    name: string;
    symbol?: string;
}

interface ServingSize {
    amount: string;
    measurement: Measurement;
}

interface Nutrition {
    caloriesPerServing: number;
    servingsPerContainer: number;
    servingSizes: ServingSize[];
}

interface Food {
    description: string;
    enabled: boolean;
    name: string;
    nutrition: Nutrition;
    tags: string[];
}

Deno.test("formDatatoObject - Converts FormData object to JS model object of type Food", () => {
    // Assign
    const formData = new FormData();

    formData.append("name", "Egg");
    formData.append("description", "Chicken egg");
    formData.append("enabled", "true");
    formData.append("tags[]", "protein");
    formData.append("tags[]", "egg");
    formData.append("nutrition.caloriesPerServing", "70");
    formData.append("nutrition.servingsPerContainer", "12");
    formData.append("nutrition.servingSizes[0].amount", "1");
    formData.append("nutrition.servingSizes[0].measurement.name", "egg");
    formData.append("nutrition.servingSizes[1].amount", "50");
    formData.append("nutrition.servingSizes[1].measurement.name", "grams");
    formData.append("nutrition.servingSizes[1].measurement.symbol", "g");

    // Act
    const model = formDataToObject<Food>(formData);

    // Assert
    assertObjectMatch(model, {
        name: "Egg",
        description: "Chicken egg",
        enabled: true,
        tags: ["protein", "egg"],
        nutrition: {
            caloriesPerServing: 70,
            servingsPerContainer: 12,
            servingSizes: [
                {
                    amount: 1,
                    measurement: {
                        name: "egg"
                    }
                },
                {
                    amount: 50,
                    measurement: {
                        name: "grams",
                        symbol: "g"
                    }
                }
            ]
        }
    });
});
