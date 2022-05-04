module.exports.getDay = getDate
module.exports.getDateAndTime = getDateAndTime
function getDate() {
    const date = new Date()
    const options = {
        weekday:'long',
        day: 'numeric',
        month: 'long',
    }
    return date.toLocaleDateString('en-US', options)
}
function getDateAndTime() {
const date = new Date()
    const options = {
        weekday:'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
}