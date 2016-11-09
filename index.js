'use strict'

module.exports = {
    forEach: forEach,
    map: map,
    sort: sort
}

function forEach(collection, chunkLength, operation, done) {
    function actOnRange(startIndex, doneChunk) {
        let limit = startIndex + chunkLength

        for (let i = startIndex; i < limit && i < collection.length; i++) {
            operation(collection[i])
        }

        if (limit > collection.length) {
            return doneChunk(null, collection)
        } else {
            setImmediate(() => {
                actOnRange(limit, done)
            })
        }
    }

    actOnRange(0, done)
}

function map(collection, chunkLength, operation, done) {
    function actOnRange(startIndex, doneChunk) {
        let limit = startIndex + chunkLength

        for (let i = startIndex; i < limit && i < collection.length; i++) {
            collection[i] = operation(collection[i])
        }

        if (limit > collection.length) {
            return doneChunk(null, collection)
        } else {
            setImmediate(() => {
                actOnRange(limit, done)
            })
        }
    }

    actOnRange(0, done)
}

function sort(collection, chunkLength, sortFunc, done) {
    const iterationMax = Math.ceil(collection.length / chunkLength)

    function actOnRange(iteration, doneChunk) {
        if (iteration > iterationMax) {
            let finalSort = collection.sort(sortFunc)
            return doneChunk(null, finalSort)
        }

        let chunk = collection.splice(0, chunkLength)
        chunk.sort(sortFunc)
        collection = collection.concat(chunk)

        setImmediate(() => {
            actOnRange(iteration + 1, doneChunk)
        })
    }

    actOnRange(0, done)
}
