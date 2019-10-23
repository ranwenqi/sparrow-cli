# @moyuyc/inquirer-autocomplete-prompt

**Forked from [inquirer-autocomplete-prompt](https://github.com/mokkabonna/inquirer-autocomplete-prompt), but [exported readline as third argument in `source` for suggesting matched text](https://github.com/mokkabonna/inquirer-autocomplete-prompt/pull/73)**

[![Greenkeeper badge](https://badges.greenkeeper.io/mokkabonna/inquirer-autocomplete-prompt.svg)](https://greenkeeper.io/)

Autocomplete prompt for [inquirer](https://github.com/SBoudrias/Inquirer.js)

[![build status](https://secure.travis-ci.org/mokkabonna/inquirer-autocomplete-prompt.svg)](http://travis-ci.org/mokkabonna/inquirer-autocomplete-prompt)
[![dependency status](https://david-dm.org/mokkabonna/inquirer-autocomplete-prompt.svg)](https://david-dm.org/mokkabonna/inquirer-autocomplete-prompt)

## Installation

```
npm install --save @moyuyc/inquirer-autocomplete-prompt
```

## Usage

This prompt is anonymous, meaning you can register this prompt with the type name you please:

```javascript
inquirer.registerPrompt('autocomplete', require('@moyuyc/inquirer-autocomplete-prompt'));
inquirer.prompt({
  type: 'autocomplete',
  ...
})
```

Change `autocomplete` to whatever you might prefer.

### Options

> **Note:** _allowed options written inside square brackets (`[]`) are optional. Others are required._

`type`, `name`, `message`, `source`[, `pageSize`, `filter`, `when`, `suggestOnly`, `validate`, `default`, `noResultText`, `searchText`, `throttleWaitMilliseconds`]

See [inquirer](https://github.com/SBoudrias/Inquirer.js) readme for meaning of all except **source** and **suggestOnly**.

**Source** will be called with previous answers object and the current user input each time the user types.

**Source** will be called once at at first before the user types anything with **undefined** as the value. If a new search is triggered by user input it maintains the correct order, meaning that if the first call completes after the second starts, the results of the first call are never displayed.

**suggestOnly** is default **false**. Setting it to true turns the input into a normal text input. Meaning that pressing enter selects whatever value you currently have. And pressing tab autocompletes the currently selected value in the list. This way you can accept manual input instead of forcing a selection from the list.

**validate** is only active when **suggestOnly** is set to **true**. It behaves like validate for the input prompt.

**default** is type of **string**. Setting it as default value.

**noResultText** is type of **string | null**. Setting it as text to view (hide it when `null`) when no results. (`'No results...'` by default)

**searchText** is type of **string | null**. Setting it as text to view (hide it when `null`) when is searching. (`'Searching...'` by default)

**throttleWaitMilliseconds** is type of **number** for throttle search call times (400 by default)


#### Example

```javascript
const autoComplete = require('@moyuyc/inquirer-autocomplete-prompt');
inquirer.registerPrompt('autocomplete', autoComplete);
inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'from',
      message: 'Select a state to travel from',
      source: function(answersSoFar, input, rl) {
        // e.g. sliceInput('closed #123,#222', { delimiter: '\\s,', cursor: 7 })
        // output: { leftIndex: 7, matching: '#123', rightIndex: 11 }
        //  input.slice(0, leftIndex) + matching + input.slice(rightIndex) === input
        const { matching, leftIndex, rightIndex } = autoComplete.sliceInput(
          input,
          // delimiter:
          //    sliceInput
          //    type: string
          //    default: `'\\s'`
          { ...rl, delimiter: ',\\s' }
        );
        // rl.cursor
        return myApi.searchStates(input);
      },
    },
  ])
  .then(function(answers) {
    //etc
  });
```

See also [example.js](./example.js) for a working example.

I recommend using this package with [fuzzy](https://www.npmjs.com/package/fuzzy) if you want fuzzy search. Again, see the example for a demonstration of this.

![Autocomplete prompt](./snapshot.svg)

## Credits

[Martin Hansen](https://github.com/mokkabonna/)

## License

ISC
