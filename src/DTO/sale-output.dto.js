
class SaleOutputDto {
    constuctor(saleData) {
        this.saleId = saleData.id
        this.code = saleData.code
        this.saleDescription = this.setDescription(saleData)
        this.total = saleData.total
        this.user = saleData.user
        this.date = this.setDate(saleData)
    }

    setDescription = (saleData) => {
        const splitProd = saleData.description.split('&')
        
        const prodDetail = []

        for (let prod of splitProd) {
            const property = prod.split('-')
            const product = {
                id: property[0],
                product: property[1],
                code: property[2],
                quantity: property[3],
                price: property[4],
                total: property[5]
            }

        }
        
        prodDetail.pop()
        
        return prodDetail
    }

    setDate = (saleData) => {
        const saleDateRaw = saleData.createdAt.toString()
        const saleDate = saleDateRaw.split('(')[0]

        return saleDate
    }
}


module.exports = SaleOutputDto