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
dataset   | `array` |  | auto complete will pick data from this array, must be a object array width id and value property
debounce | `number` | milliseconds to delay the input complete trigger
mode     | `string` |  indexOf | other option includes `startWidth` and `endWidth`

## Methods

Name | params | return value | Description
--------- | ---- | --------|-----------
changeData | dataset |  |  change auto complete component's dataset