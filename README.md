async-chunked-array
---

Helper for performing asynchronous operations on arrays. This module is intended to allow CPU intensive array operations without blocking the event loop.

## How to use

Each method takes the following parameters:
* collection - the array to operate on.
* chunkLength - how many array items to operate on before breaking and allowing the event loop to become free.
* operation - the function to run against the array / array items.
* callback - runs when the current operation completes.

## Example

```js
const arrayHelper = require('async-chunked-array')

let longArray = [ ... some long array ... ]

arrayHelper.each(longArray, 1000, (item) => {
    // do something with item
}, (err) => {
    if (err) { throw err }
})

arrayHelper.map(longArray, 1000, (item) => {
    return item * 2
}, (err, results) => {
    if (err) { throw err }

    // results is the transformed array
})

arrayHelper.sort(longArray, 1000, (a, b) => {
    return a < b ? -1 : 1
}, (err, sorted) => {
    if (err) { throw err }

    // sorted is the sorted array
})
```
