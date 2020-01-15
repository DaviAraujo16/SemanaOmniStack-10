module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(items => items.trim());
}