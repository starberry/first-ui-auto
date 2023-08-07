export const removeSpecialChar = (val, symbol = '-') => {
    if (typeof val === 'undefined') {
        return val.replace(/[^\w\s]/gi, ' ').replace(/\s\s+/g, ' ').replace(/ /gi, symbol).toLowerCase()
    }
    return val;
}
