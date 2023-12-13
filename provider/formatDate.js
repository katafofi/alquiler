const formattedDate = (date) => {
    const newDate = new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return newDate
}

module.exports = formattedDate