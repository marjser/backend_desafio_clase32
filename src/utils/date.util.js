
const generateDate = () => {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    
    const finalDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`

    return finalDate

}

module.exports = generateDate