# FormData to Object

Converts the `FormData` object into a complex object model.

This package is intended for use with Deno, specifically, as a utility class to make form data in the Deno Fresh framework easier to work with.

## How to use

This package assumes that you are submitting a form to the deno server and that the data is being converted to a `FormData` object ([FormData docs](https://developer.mozilla.org/en-US/docs/Web/API/FormData)).

This package can only be used to create complex objects, that is to say, objects with properties and/or sub-properties of primitive values, primitive arrays, complex objects, or arrays of complex objects.

At the moment primitive types are limited to `number`, `boolean`, and `string`.

In order for the package to construct the model object from the form data correctly, following the correct naming convention for field names is required:

* Field names are case-sensitive as JS property names are case-sensitive
* In order to access properties of nested objects, names should be separated by period/dot `.`. For example, `<input name="user.settings.enabled" value="true" />` would create an object of the following:

```js
{
  user: {
    settings: {
      enabled: true
    }
  }
}
```

* Field names for arrays holding primitive values must use empty square braces, e.g. `tags[]`. Using the same name for multiple fields will put those field values in the same property array.
* Field names for arrays holding complex objects must include the index number ov the object to assign properties to. Failing to put the correct index number will result in strange objects being created or values overriding existing objects and not being assigned to the correct object. At the moment, indexed fields must go in numeric order starting with index `0` and incrementing by one. Order of indexed fields may become less of an issue in the future, but for now this is required.
* Accessing properties of complex objects within an array can be done by using the following naming convention: `<input name="user.emails[0].displayName" />`

For example the following Form/FormData object is converted into the following model object:

###### TSX/HTML

```tsx
<form method="post">
    <Input name="name" label="Name" />

    <TextArea name="description" label="Description" rows={10} />

    <CheckBox name="enabled" label="Enabled" />

    <Heading size="6" classes="mb-1">Tags</Heading>

    <Input name="tags[]" placeholder="tag" />
    <Input name="tags[]" placeholder="tag" />
    <Input name="tags[]" placeholder="tag" />
    <Input name="tags[]" placeholder="tag" />

    <Input type="number" name="nutrition.caloriesPerServing" label="Calories per Serving" />

    <Input type="number" name="nutrition.servingsPerContainer" label="Number of Servings" />

    <Heading size="6" classes="mb-1">Serving Size</Heading>

    <div>
        <Input name="nutrition.servingSizes[0].amount" placeholder="amount" />
        <Input name="nutrition.servingSizes[0].measurement.name" placeholder="name, e.g. 'grams'" />
        <Input name="nutrition.servingSizes[0].measurement.symbol" placeholder="symbol, shorthand e.g. 'g'" />
    </div>

    <div>
        <Input name="nutrition.servingSizes[1].amount" placeholder="amount" />
        <Input name="nutrition.servingSizes[1].measurement.name" placeholder="name, e.g. 'grams'" />
        <Input name="nutrition.servingSizes[1].measurement.symbol" placeholder="symbol, shorthand e.g. 'g'" />
    </div>

    <div>
        <Input name="nutrition.servingSizes[2].amount" placeholder="amount" />
        <Input name="nutrition.servingSizes[2].measurement.name" placeholder="name, e.g. 'grams'" />
        <Input name="nutrition.servingSizes[2].measurement.symbol" placeholder="symbol, shorthand e.g. 'g'" />
    </div>

    <Button type="submit">Submit</Button>
</form>
```

###### FormData

```js
FormData {
  [Symbol("entry list")]: [
    { name: "name", value: "Maille Hot Honey Mustard" },
    { name: "description", value: "Sweet-savory-heat combination of dijon mustard and honey infused with chili peppers" },
    { name: "enabled", value: "true" },
    { name: "tags[]", value: "mustard" },
    { name: "tags[]", value: "honey" },
    { name: "tags[]", value: "spicey" },
    { name: "tags[]", value: "maille" },
    { name: "nutrition.caloriesPerServing", value: "10" },
    { name: "nutrition.servingsPerContainer", value: "44" },
    { name: "nutrition.servingSizes[0].amount", value: "1" },
    { name: "nutrition.servingSizes[0].measurement.name", value: "teaspoon" },
    { name: "nutrition.servingSizes[0].measurement.symbol", value: "tsp" },
    { name: "nutrition.servingSizes[1].amount", value: "1/50" },
    { name: "nutrition.servingSizes[1].measurement.name", value: "cups" },
    { name: "nutrition.servingSizes[1].measurement.symbol", value: "c" },
    { name: "nutrition.servingSizes[2].amount", value: "6" },
    { name: "nutrition.servingSizes[2].measurement.name", value: "grams" },
    { name: "nutrition.servingSizes[2].measurement.symbol", value: "g" }
  ],
  [Symbol("[[webidl.brand]]")]: Symbol("[[webidl.brand]]")
}

```

###### Model

```js
{
  name: "Maille Hot Honey Mustard",
  description: "Sweet-savory-heat combination of dijon mustard and honey infused with chili peppers",
  enabled: true,
  tags: ["mustard", "honey", "spicey", "maille"],
  nutrition: {
    caloriesPerServing: 10,
    servingsPerContainer: 44,
    servingSizes: [
      {
        amount: 1,
        measurement: {
          name: "teaspoon",
          symbol: "tsp"
        }
      },
      {
        amount: "1/50",
        measurement: {
          name: "cup",
          symbol: "c"
        }
      },
      {
        amount: 6,
        measurement: {
          name: "grams",
          symbol: "g"
        }
      }
    ]
  }
}
```

As you can see, the order of index numbers within the HTML form matter. At this time, there is no logic to handle higher numbered indices. For example ordering complex array field names in the following order:

```html
<input name="cars[0].name" />
<input name="cars[2].name" />
```

or

```html
<input name="cars[0].name" />
<input name="cars[2].name" />
<input name="cars[1].name" />
```

or

```html
<input name="cars[2].name" />
<input name="cars[0].name" />
```

Will cause the code to fail. There are plans to address this so the order of indexing is not as strict, but that is for the future.
