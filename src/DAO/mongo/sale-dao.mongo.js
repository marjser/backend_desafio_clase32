const NewSaleDto = require("../../DTO/sale-input.dto")
const Sales = require("../../models/sale.model")



class SalesDao {
    async saleInput (userInput, cartDocs) {
        try {
            const saleData = new NewSaleDto(userInput, cartDocs)

            const saleDataReturn = await Sales.create(saleData)
            
            return saleDataReturn
        } catch (error) {
            throw error
        }
    }

    async findSaleById (id) {
        try {

            
            const {code, saleDescription, total, user, _id, createdAt} = await Sales.findById(id)
            
            const saleDataReturn = {
                id: _id.toString(),
                code,
                saleDescription,
                total,
                user,
                createdAt
            }
            
            return saleDataReturn
        } catch (error) {
            throw error
        }
    }
}


module.exports = SalesDao

