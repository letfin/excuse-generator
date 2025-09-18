function getCurrentDate(){
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()} || ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = {getCurrentDate}