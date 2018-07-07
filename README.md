# AutoComplete

a component to auto complete input

## Installation
```bash
npm i my-autocompletec -S
```

## Usage
```javascript
import {AutoComplete} from 'my-autocompletec';

new AutoComplete({
    target: '#input',
    dataset: [],
    debounce: 300
})
```   

## Params

Parameter | Type |Default| Description
--------- | ---- | ------|-----------
target    | `string` |  | the input's selector used in document.querySelector
dataset   | `array` |  | auto complete will pick data from this array
debounce | `number` | milliseconds to delay the input complete trigger


