# Triangle Type Detector

A Javascript module to detect type of a triangle based on 3 given values as triangle's side lengths.

---

## Usage

* Install via NPM: `npm install @farskid/triangle-type` or Yarn: `yarn add @farskid/triangle-type`.

* Import into your own project:

  * ES modules: `import triangleTypeDetecor from '@farskid/triangle-type'`.
  * Commonjs: `const triangleTypeDetecor = require('@farskid/triangle-type')`

```js
import triangleTypeDetecor from '@farskid/triangle-type';

// Resolves with valid type
triangleTypeDetecor(3, 4, 5)
  .then(type => console.log(type)) // 'Scalene'
  .catch(err => sendErrorToReportingService(err));

// Resolves with invalid type
triangleTypeDetecor(1, 2, 3)
  .then(type => console.log(type)) // 'Invalid'
  .catch(err => sendErrorToReportingService(err));

// Rejects because of negative number
triangleTypeDetecor(-2, 4, 5)
  .then(type => console.log(type))
  .catch(err => sendErrorToReportingService(err)); // {code: 'NOT_POSITIVE', message: 'triangleDetector requires all 3 parameters to be a positive number'}

// Rejects because of not a number
triangleTypeDetecor(null, 4, 5)
  .then(type => console.log(type))
  .catch(err => sendErrorToReportingService(err)); // {code: 'NOT_NUMBER', message: 'triangleDetector requires all 3 parameters to be of type number, instead got: null , number , number'}
```

---

## How it's done

### Validations

In order to make sure the module works fine, I had to validate inputs. Accroding to geometry, all sides lengths must be positive numbers.

Also they should obey a rule as:

> Every side must be less than the sum of other two sides.
> It means that given a,b and c as side lengths, they will shape a valid triangle if and only if:

* a + b > c
* a + c > b
* b + c > a

> We won't need to check for all of the 3 comparisons. Instead, if the maximum value of sides lengths is less than the sum of all the other two, all comparisons are true implicitly. Simple Math, Lol.

So basically, I'm checking `longest_side < sum_of_all_sides_except_longest_side`.

---

### Technical decisions

**Pure functions**: In order to follow the rule of **separation of concerns**, I've used pure functions as utilities to help me with reusable logics. Utilities are listed as: is-positive, is-number to validate side length inputs and array-sum to calculate the sum of items in an array.

**Error handling**: To come up with a solid API for the module and ease the error handling process for the consumers, I decided to implement the module in a way to return a promise. Using promises, One can easily use `.then` to grab the type value and `.catch` to catch exceptions. Pomises are built-in to the language and provide a handful collection of methods for concurrency, composability and sequential execution. They're also async instinctly, so there would be no I/O blocking in this module.

To have a robust error object, I've created a fatcory function as a utility `error-factory.js` to create error object. It extends the built-in _Error_ object using prototypal inheritance and provides `code` and `message` property for further details.

**Constants**: All the constants used by the module, including _Triangle types_ and _Error codes_ are stored in this file.

**index.js**: This is the main entry of the module that consumers can import the logic from. for more detials, see the **Usage** section above.

**triangle-type-detect**: This is the core logic of the module. it runs a couple of validations to make sure all 3 inputs are numbers and positive. It also runs a validation check to ensure the geometry rule discussed in the **validation** section above.

**Formatting**: I'm using prettier to format all `.js` and `.md` files based on a certain config.

**Linting**: I'm using ESLint with a base config from Airbnb to lint my codebase.

---

## API

The module:

#### will return one of these 4 types:

* 'Isosceles': When two of the sides are equal.
* 'Equilateral': When all sides are equal.
* 'Scalene': When all sides are from different values.
* 'Invalid': When side lengths can't shape a valid triangle. This means that lengths can't obey the geometry rule.

#### or throws an exception of type:

* NOT_NUMBER: When at least one of the inputs is not of type number.
* NOT_POSITIVE: When at least one of the inputs is not a positive number.

All exceptions are rejected by an error object that must have `code` and `message` property.

---

## Development

* Clone the repo: `git clone https://github.com/farskid/triangle-type.git`
* `cd triangle-type`
* Scripts available:
  * _test_: Run `yarn test`.
  * _test with watch mode_: Run `yarn test:watch`
  * _lint_: Run `yarn lint`
  * _format_: Run `yarn format`

## License

MIT licensed.
Made by love by Farzad YZ.
