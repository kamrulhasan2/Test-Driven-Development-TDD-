const greeting = (name = 'guest') => {

    if (typeof name === 'number' || typeof name === 'object' || typeof name === 'boolean' || typeof name === 'function' || typeof name === 'undefined') {
        throw Error('Invalid perameter');
    }


    return `hello ${name}`
}

module.exports = greeting;