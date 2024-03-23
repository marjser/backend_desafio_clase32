const SalesDao = require("../DAO/mongo/sale-dao.mongo")
const SaleOutputDto = require("../DTO/sale-output.dto")
const generateDate = require("../utils/date.util")
const ticketGenerator = require("../utils/ticket-genetaror.util")


const Sales = new SalesDao()

const purchase = async (user, cartDocs) => {
    const saleData = await Sales.saleInput(user, cartDocs)
    
    return saleData
}

const saleFindById = async (id) => {
    try {

        const saleData = await Sales.findSaleById(id)
        
        const ticket = ticketGenerator(saleData)
    
        return ticket
        
    } catch (error) {
        throw error
    }
}

module.exports = {purchase, saleFindById}

